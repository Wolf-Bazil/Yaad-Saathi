import * as THREE from 'three';

export default class GunSystem {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 15;
    
    this.hasAmmo = true;
    this.cooldown = false;
    
    this.muzzleFlash = new THREE.PointLight('#ffaa00', 0, 8);
    this.scene.add(this.muzzleFlash);
    
    this.npcMeshes = [];
    
    this.onAnomalyHit = null;
    this.onWrongTarget = null;
    this.onMissedShot = null;
    this.onPlayGunshot = null;
    this.onPlayEmptyClick = null;
    
    this.shakeAmount = 0;
    this.shakeDecay = 8;
    this.originalCamPos = new THREE.Vector3();
    
    this._onClick = this._onClick.bind(this);
  }
  
  enable() {
    document.addEventListener('click', this._onClick);
  }
  
  disable() {
    document.removeEventListener('click', this._onClick);
  }
  
  registerNPCs(npcList) {
    this.npcMeshes = npcList;
  }
  
  resetAmmo() {
    this.hasAmmo = true;
  }
  
  _onClick(e) {
    if (this.cooldown || !document.pointerLockElement) return;
    
    if (!this.hasAmmo) {
      if (this.onPlayEmptyClick) this.onPlayEmptyClick();
      return;
    }
    
    this.hasAmmo = false;
    this.cooldown = true;
    
    if (this.onPlayGunshot) this.onPlayGunshot();
    
    this.muzzleFlash.position.copy(this.camera.position);
    this.muzzleFlash.intensity = 8;
    setTimeout(() => { this.muzzleFlash.intensity = 0; }, 80);
    
    this.shakeAmount = 0.08;
    
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    
    let hitAnomaly = false;
    let hitNormal = false;
    
    for (const npc of this.npcMeshes) {
      const allMeshes = [];
      npc.group.traverse((child) => {
        if (child.isMesh) allMeshes.push(child);
      });
      
      const intersects = this.raycaster.intersectObjects(allMeshes, false);
      if (intersects.length > 0) {
        if (npc.isAnomaly) {
          hitAnomaly = true;
          if (this.onAnomalyHit) this.onAnomalyHit(npc);
        } else {
          hitNormal = true;
          if (this.onWrongTarget) this.onWrongTarget(npc);
        }
        break;
      }
    }
    
    if (!hitAnomaly && !hitNormal) {
      if (this.onMissedShot) this.onMissedShot();
    }
    
    setTimeout(() => { this.cooldown = false; }, 200);
  }
  
  update(delta) {
    if (this.shakeAmount > 0) {
      this.camera.position.x += (Math.random() - 0.5) * this.shakeAmount;
      this.camera.position.y += (Math.random() - 0.5) * this.shakeAmount;
      this.shakeAmount = Math.max(0, this.shakeAmount - this.shakeDecay * delta);
    }
  }
  
  getCrosshairTarget() {
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    for (const npc of this.npcMeshes) {
      const allMeshes = [];
      npc.group.traverse((child) => {
        if (child.isMesh) allMeshes.push(child);
      });
      const intersects = this.raycaster.intersectObjects(allMeshes, false);
      if (intersects.length > 0 && intersects[0].distance < 8) {
        return { isOver: true, isAnomaly: npc.isAnomaly };
      }
    }
    return { isOver: false, isAnomaly: false };
  }
  
  dispose() {
    this.disable();
    this.scene.remove(this.muzzleFlash);
    this.muzzleFlash.dispose();
  }
}
