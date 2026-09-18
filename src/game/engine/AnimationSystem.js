import * as THREE from 'three';

export default class AnimationSystem {
  constructor() {
    this.npcs = [];
    this.playerCamera = null;
  }
  
  setPlayerCamera(camera) { 
    this.playerCamera = camera; 
  }
  
  registerNPC(npc) {
    npc.animState = {
      blinkTimer: Math.random() * 5,
      blinkDuration: 0,
      breathPhase: Math.random() * Math.PI * 2,
      timeOffset: Math.random() * 10,
      twitchTimer: Math.random() * 3,
      twitchDuration: 0,
      smileProgress: 0,
      followerTimer: 0,
      shiftCooldown: 0,
      originalHeadRotation: npc.limbs.head.rotation.clone(),
      isHeadTurned: false
    };
    this.npcs.push(npc);
  }
  
  clearAll() { 
    this.npcs = []; 
  }
  
  update(delta, elapsedTime) {
    for (const npc of this.npcs) {
      this._updateIdleAnimations(npc, delta, elapsedTime);
      if (npc.isAnomaly) {
        this._updateAnomalyAnimation(npc, delta, elapsedTime);
      }
    }
  }
  
  _updateIdleAnimations(npc, delta, elapsedTime) {
    if (npc.anomalyType === 'rigid_one' || npc.anomalyType === 'follower' && npc.animState.followerTimer > 8) {
      return;
    }

    const state = npc.animState;
    const t = elapsedTime + state.timeOffset;

    // Breathing sway
    npc.limbs.torso.position.y = 0.3 + Math.sin(t * 1.5) * 0.003;

    // Head bob - avoid interfering with starer or head_turner
    if (npc.anomalyType !== 'starer' && !state.isHeadTurned) {
      npc.limbs.head.rotation.x = state.originalHeadRotation.x + Math.sin(t * 0.8) * 0.02;
    }

    // Blink
    state.blinkTimer -= delta;
    if (state.blinkTimer <= 0) {
      state.blinkDuration = 0.12; // 120ms
      state.blinkTimer = 3 + Math.random() * 3; // Reset timer 3-6s
    }

    if (state.blinkDuration > 0) {
      state.blinkDuration -= delta;
      npc.limbs.leftEye.scale.y = 0.1;
      npc.limbs.rightEye.scale.y = 0.1;
    } else {
      npc.limbs.leftEye.scale.y = 1.0;
      npc.limbs.rightEye.scale.y = 1.0;
    }
  }
  
  _updateAnomalyAnimation(npc, delta, elapsedTime) {
    const state = npc.animState;
    
    switch(npc.anomalyType) {
      case 'head_turner':
        if (!this.playerCamera) break;
        const toNPC = new THREE.Vector3().subVectors(npc.group.position, this.playerCamera.position).normalize();
        const cameraForward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.playerCamera.quaternion);
        const dot = cameraForward.dot(toNPC);
        
        if (dot < 0.3) {
          // Player looking away
          state.isHeadTurned = true;
          const targetPos = this.playerCamera.position.clone();
          targetPos.y = npc.limbs.head.position.y + npc.group.position.y + npc.limbs.torso.position.y;
          
          // Use temporary object to calculate lookAt rotation
          const dummy = new THREE.Object3D();
          dummy.position.copy(npc.limbs.head.getWorldPosition(new THREE.Vector3()));
          dummy.lookAt(targetPos);
          
          // Smooth rotation
          npc.limbs.head.quaternion.slerp(dummy.quaternion, delta * 2);
        } else {
          // Snap back
          if (state.isHeadTurned) {
            npc.limbs.head.rotation.set(state.originalHeadRotation.x, state.originalHeadRotation.y, state.originalHeadRotation.z);
            state.isHeadTurned = false;
          }
        }
        break;
        
      case 'rigid_one':
        // Nothing, handled in idle skips
        break;
        
      case 'twitcher':
        state.twitchTimer -= delta;
        if (state.twitchTimer <= 0) {
          state.twitchDuration = 0.06;
          state.twitchTimer = 2 + Math.random() * 3;
          npc.limbs.head.rotation.z = (Math.random() > 0.5 ? 1 : -1) * 0.4;
        }
        
        if (state.twitchDuration > 0) {
          state.twitchDuration -= delta;
        } else {
          npc.limbs.head.rotation.z = state.originalHeadRotation.z;
        }
        break;
        
      case 'smiler':
        state.smileProgress = Math.min(1.0, state.smileProgress + delta / 10);
        npc.limbs.mouth.scale.x = 1.0 + (2.5 * state.smileProgress); // 1.0 to 3.5
        npc.limbs.mouth.scale.y = 1.0 + (1.0 * state.smileProgress); // 1.0 to 2.0
        break;
        
      case 'finger_count':
        // Structural
        break;
        
      case 'position_shifter':
        if (!this.playerCamera) break;
        state.shiftCooldown -= delta;
        
        const toShifter = new THREE.Vector3().subVectors(npc.group.position, this.playerCamera.position).normalize();
        const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.playerCamera.quaternion);
        
        if (camFwd.dot(toShifter) < 0.3 && state.shiftCooldown <= 0) {
          // Shift x by ±2
          npc.group.position.x += (Math.random() > 0.5 ? 2 : -2);
          state.shiftCooldown = 3;
        }
        break;
        
      case 'starer':
        if (!this.playerCamera) break;
        const targetPos = this.playerCamera.position.clone();
        
        // Use lookAt inside world space coordinates then apply to local
        const worldPos = npc.limbs.head.getWorldPosition(new THREE.Vector3());
        const dummyStarer = new THREE.Object3D();
        dummyStarer.position.copy(worldPos);
        dummyStarer.lookAt(targetPos);
        
        npc.limbs.head.parent.worldToLocal(dummyStarer.position);
        npc.limbs.head.quaternion.copy(dummyStarer.quaternion);
        break;
        
      case 'follower':
        if (!this.playerCamera) break;
        state.followerTimer += delta;
        
        if (state.followerTimer > 8) {
          const tStand = Math.min(1.0, (state.followerTimer - 8) / 1.0);
          
          // Phase 1: Stand up
          npc.limbs.body.position.y = THREE.MathUtils.lerp(0.5, 1.2, tStand);
          npc.limbs.leftThigh.rotation.x = THREE.MathUtils.lerp(-Math.PI/2, 0, tStand);
          npc.limbs.rightThigh.rotation.x = THREE.MathUtils.lerp(-Math.PI/2, 0, tStand);
          npc.limbs.leftShin.rotation.x = THREE.MathUtils.lerp(Math.PI/2, 0, tStand);
          npc.limbs.rightShin.rotation.x = THREE.MathUtils.lerp(Math.PI/2, 0, tStand);
          
          // Arms down
          npc.limbs.leftForearm.rotation.x = THREE.MathUtils.lerp(-Math.PI/2, 0, tStand);
          npc.limbs.rightForearm.rotation.x = THREE.MathUtils.lerp(-Math.PI/2, 0, tStand);

          // Phase 2: Walk toward player
          if (tStand >= 1.0) {
            const currentPos = npc.group.position;
            const dir = new THREE.Vector3().subVectors(this.playerCamera.position, currentPos);
            dir.y = 0; // Keep on flat ground
            if (dir.lengthSq() > 0.1) {
              dir.normalize();
              const speed = 0.3; // m/s
              npc.group.position.addScaledVector(dir, speed * delta);
              
              // Rotate NPC body to face direction
              const angle = Math.atan2(dir.x, dir.z);
              npc.group.rotation.y = angle;

              // Simple walk cycle
              const walkTime = elapsedTime * 5;
              npc.limbs.leftThigh.rotation.x = Math.sin(walkTime) * 0.5;
              npc.limbs.rightThigh.rotation.x = -Math.sin(walkTime) * 0.5;
            }
          }
        }
        break;
        
      case 'backwards_one':
      case 'shadow':
        // Structural
        break;
    }
  }
}
