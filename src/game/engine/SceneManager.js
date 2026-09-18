import * as THREE from 'three';

export default class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit pixel ratio for performance
    
    // Shadows and Tone Mapping
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.7;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#050508');
    this.scene.fog = new THREE.FogExp2('#050508', 0.08);
    
    // Camera setup
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 100);
    this.camera.position.set(0, 1.7, 0); // Eye level
    
    // Time tracking
    this.clock = new THREE.Clock();
    
    // Systems
    this.systems = [];
    
    // Resize handling
    this.onResize = this.resize.bind(this);
    window.addEventListener('resize', this.onResize);
    
    this.isRunning = false;
    this.animationFrameId = null;
    this.loop = this.loop.bind(this);
  }
  
  addSystem(system) {
    this.systems.push(system);
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    this.loop();
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  loop() {
    if (!this.isRunning) return;
    
    this.animationFrameId = requestAnimationFrame(this.loop);
    
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    
    for (let i = 0; i < this.systems.length; i++) {
      if (typeof this.systems[i].update === 'function') {
        this.systems[i].update(delta, elapsedTime);
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  resize() {
    // Only resize if canvas exists and has dimensions
    if (!this.canvas.clientWidth || !this.canvas.clientHeight) return;
    
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    
    const needResize = this.canvas.width !== width || this.canvas.height !== height;
    
    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }
  
  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    
    this.systems = [];
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Helper to traverse and dispose
    this.scene.traverse((object) => {
      if (object.isMesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
  }
}
