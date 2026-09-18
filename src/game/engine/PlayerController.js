import * as THREE from 'three';

export default class PlayerController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.enabled = false;
    
    // Movement state
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    
    // Settings
    this.moveSpeed = 2.5;
    this.backwardSpeed = 1.5;
    this.strafeSpeed = 2.0;
    this.mouseSensitivity = 0.002;
    this.eyeHeight = 1.7;
    
    // Head bob
    this.headBobTimer = 0;
    this.headBobAmount = 0.025;
    this.headBobSpeed = 8;
    this.isMoving = false;
    
    // Rotation
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    
    // Footstep callback
    this.onFootstep = null;
    this.footstepTimer = 0;
    this.footstepInterval = 0.55;
    
    // Boundary (subway car interior)
    this.bounds = {
      minX: -5.8, maxX: 5.8,
      minZ: -1.3, maxZ: 1.3,
    };
    
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerLockChange = this._onPointerLockChange.bind(this);
  }
  
  enable() {
    this.enabled = true;
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('pointerlockchange', this._onPointerLockChange);
  }
  
  disable() {
    this.enabled = false;
    this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange);
  }
  
  requestPointerLock() {
    this.domElement.requestPointerLock();
  }
  
  exitPointerLock() {
    document.exitPointerLock();
  }
  
  _onKeyDown(e) {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.moveForward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.moveBackward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.moveLeft = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.moveRight = true;
        break;
    }
  }

  _onKeyUp(e) {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.moveForward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.moveBackward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.moveLeft = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.moveRight = false;
        break;
    }
  }
  
  _onMouseMove(e) {
    if (!this.enabled || !document.pointerLockElement) return;
    
    this.euler.setFromQuaternion(this.camera.quaternion);
    
    this.euler.y -= e.movementX * this.mouseSensitivity;
    this.euler.x -= e.movementY * this.mouseSensitivity;
    
    const PI_2 = Math.PI / 2;
    this.euler.x = Math.max(-PI_2 + 0.01, Math.min(PI_2 - 0.01, this.euler.x));
    
    this.camera.quaternion.setFromEuler(this.euler);
  }
  
  _onPointerLockChange() {
    // If not locked, we could trigger a pause event here if needed
  }
  
  resetPosition() {
    this.camera.position.set(0, this.eyeHeight, -4.5);
    this.euler.set(0, 0, 0);
    this.camera.quaternion.setFromEuler(this.euler);
  }
  
  update(delta) {
    if (!this.enabled) return {
      isMoving: false,
      position: this.camera.position.clone(),
      forward: this.camera.getWorldDirection(new THREE.Vector3())
    };
    
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, this.euler.y, 0));
    const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.euler.y, 0));
    
    const velocity = new THREE.Vector3();
    
    if (this.moveForward) velocity.add(forward.clone().multiplyScalar(this.moveSpeed));
    if (this.moveBackward) velocity.add(forward.clone().multiplyScalar(-this.backwardSpeed));
    if (this.moveLeft) velocity.add(right.clone().multiplyScalar(-this.strafeSpeed));
    if (this.moveRight) velocity.add(right.clone().multiplyScalar(this.strafeSpeed));
    
    if (velocity.lengthSq() > 0) {
      velocity.normalize().multiplyScalar(this.moveSpeed * delta);
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
    
    this.camera.position.add(velocity);
    
    // Clamp to bounds
    this.camera.position.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.camera.position.x));
    this.camera.position.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, this.camera.position.z));
    
    if (this.isMoving) {
      this.headBobTimer += delta * this.headBobSpeed;
      this.camera.position.y = this.eyeHeight + Math.sin(this.headBobTimer) * this.headBobAmount;
      
      this.footstepTimer += delta;
      if (this.footstepTimer >= this.footstepInterval) {
        if (this.onFootstep) this.onFootstep();
        this.footstepTimer = 0;
      }
    } else {
      this.headBobTimer = 0;
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, this.eyeHeight, delta * 5);
      this.footstepTimer = this.footstepInterval;
    }
    
    return {
      isMoving: this.isMoving,
      position: this.camera.position.clone(),
      forward: this.camera.getWorldDirection(new THREE.Vector3()),
    };
  }
  
  dispose() {
    this.disable();
  }
}
