import * as THREE from 'three';

export default class LightingSystem {
  constructor(scene) {
    this.scene = scene;
    this.lights = [];
    this.tubes = [];
    
    // Flicker state
    this.flickerLevel = 'normal'; // normal, medium, high, extreme
    this.flickerChances = {
      normal: 0.005,
      medium: 0.02,
      high: 0.04,
      extreme: 0.08
    };
    
    this.isBlackout = false;
    this.isStrobe = false;
    this.strobeTimer = 0;
    this.strobeCount = 0;
    this.strobeOn = false;
    this.strobeConfig = null;
    
    this.initLights();
  }
  
  initLights() {
    // 1. AmbientLight
    this.ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.15);
    this.scene.add(this.ambientLight);
    
    // 2. Fluorescent tube assemblies
    const xPositions = [-3, 0, 3];
    
    for (let i = 0; i < xPositions.length; i++) {
      const x = xPositions[i];
      
      // Tube Mesh
      const tubeGeo = new THREE.BoxGeometry(2, 0.05, 0.15);
      // Material needs to be unique so it can dim independently
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.position.set(x, 2.75, 0);
      this.scene.add(tubeMesh);
      
      // SpotLight
      const spotLight = new THREE.SpotLight(0xe8e4d4, 3.0);
      spotLight.position.set(x, 2.75, 0);
      spotLight.angle = Math.PI / 3;
      spotLight.penumbra = 0.5;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      
      // Target
      const targetObj = new THREE.Object3D();
      targetObj.position.set(x, 0, 0);
      this.scene.add(targetObj);
      spotLight.target = targetObj;
      
      this.scene.add(spotLight);
      
      this.tubes.push({
        mesh: tubeMesh,
        material: tubeMat,
        light: spotLight,
        baseIntensity: 3.0,
        flickerTimer: 0,
        isFlickering: false,
        targetObj: targetObj
      });
    }
    
    // 3. Emergency Red Light
    this.redLight = new THREE.PointLight(0xff0000, 0, 10);
    this.redLight.position.set(0, 2.0, 0);
    this.scene.add(this.redLight);
    this.redAlertActive = false;
    this.redPulseTime = 0;
  }
  
  setFlickerIntensity(level) {
    if (this.flickerChances[level] !== undefined) {
      this.flickerLevel = level;
    }
  }
  
  triggerBlackout(durationMs, callback) {
    if (this.isBlackout) return;
    this.isBlackout = true;
    
    // Turn off all lights
    this.setAllTubesState(false);
    
    setTimeout(() => {
      this.isBlackout = false;
      this.setAllTubesState(true);
      if (callback) callback();
    }, durationMs);
  }
  
  triggerStrobe(count, onMs, offMs, callback) {
    this.isStrobe = true;
    this.strobeCount = count * 2; // on and off are separate counts
    this.strobeConfig = { onMs, offMs, callback };
    this.strobeOn = false;
    this.strobeTimer = 0;
    this.setAllTubesState(false);
  }
  
  triggerRedAlert() {
    this.redAlertActive = true;
    this.redPulseTime = 0;
    this.setAllTubesState(false);
    this.ambientLight.intensity = 0.05;
  }
  
  setAllTubesState(on) {
    for (let i = 0; i < this.tubes.length; i++) {
      const tube = this.tubes[i];
      if (on) {
        tube.light.intensity = tube.baseIntensity;
        tube.material.color.setHex(0xffffff);
      } else {
        tube.light.intensity = 0;
        tube.material.color.setHex(0x333333);
      }
    }
  }
  
  update(delta) {
    if (this.isBlackout) return; // Managed by timeout
    
    if (this.isStrobe) {
      this.strobeTimer += delta * 1000; // ms
      
      const threshold = this.strobeOn ? this.strobeConfig.onMs : this.strobeConfig.offMs;
      
      if (this.strobeTimer >= threshold) {
        this.strobeTimer -= threshold;
        this.strobeCount--;
        
        if (this.strobeCount <= 0) {
          this.isStrobe = false;
          this.setAllTubesState(true);
          if (this.strobeConfig.callback) this.strobeConfig.callback();
        } else {
          this.strobeOn = !this.strobeOn;
          this.setAllTubesState(this.strobeOn);
        }
      }
      return;
    }
    
    if (this.redAlertActive) {
      this.redPulseTime += delta;
      // Pulse between 1 and 5 intensity
      this.redLight.intensity = 3 + Math.sin(this.redPulseTime * 5) * 2;
      return; // Skip normal flicker when red alert is on
    }
    
    // Normal flicker logic
    const chance = this.flickerChances[this.flickerLevel];
    
    // Extreme blackout chance
    if (this.flickerLevel === 'extreme' && Math.random() < 0.005) {
      this.triggerBlackout(300);
      return;
    }
    
    for (let i = 0; i < this.tubes.length; i++) {
      const tube = this.tubes[i];
      
      if (tube.isFlickering) {
        tube.flickerTimer -= delta * 1000;
        if (tube.flickerTimer <= 0) {
          // Restore
          tube.isFlickering = false;
          tube.light.intensity = tube.baseIntensity;
          tube.material.color.setHex(0xffffff);
        }
      } else {
        // Chance to start flickering
        if (Math.random() < chance) {
          tube.isFlickering = true;
          tube.flickerTimer = 80 + Math.random() * 120; // 80-200ms
          // Dim to ~30%
          tube.light.intensity = tube.baseIntensity * 0.3;
          tube.material.color.setHex(0x555555);
        }
      }
    }
  }
  
  dispose() {
    this.scene.remove(this.ambientLight);
    this.ambientLight.dispose();
    
    this.scene.remove(this.redLight);
    this.redLight.dispose();
    
    for (let i = 0; i < this.tubes.length; i++) {
      const tube = this.tubes[i];
      
      this.scene.remove(tube.mesh);
      tube.mesh.geometry.dispose();
      tube.material.dispose();
      
      this.scene.remove(tube.light);
      tube.light.dispose();
      
      this.scene.remove(tube.targetObj);
    }
    
    this.tubes = [];
  }
}
