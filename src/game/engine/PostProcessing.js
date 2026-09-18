import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uGrainIntensity;
uniform float uAberration;
uniform float uVignetteIntensity;
uniform float uRedTint;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  vec2 offset = vec2(uAberration, 0.0);
  float r = texture2D(tDiffuse, uv + offset).r;
  float g = texture2D(tDiffuse, uv).g;
  float b = texture2D(tDiffuse, uv - offset).b;
  
  vec3 color = vec3(r, g, b);
  
  float grey = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(grey), color, 0.7);
  
  color.r += uRedTint;
  
  color *= 0.95 + 0.05 * sin(gl_FragCoord.y * 1.5);
  
  float grain = (fract(sin(dot(uv * uTime, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * uGrainIntensity;
  color += grain;
  
  float v = smoothstep(0.8, 0.2, length(uv - 0.5));
  color *= mix(1.0, v, uVignetteIntensity);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export default class PostProcessing {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    
    const size = renderer.getSize(new THREE.Vector2());
    this.renderTarget = new THREE.WebGLRenderTarget(size.x, size.y, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });
    
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.fsQuadScene = new THREE.Scene();
    
    this.uniforms = {
      tDiffuse: { value: this.renderTarget.texture },
      uTime: { value: 0 },
      uGrainIntensity: { value: 0.06 },
      uAberration: { value: 0.0 },
      uVignetteIntensity: { value: 1.0 },
      uRedTint: { value: 0.0 },
    };
    
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    this.fsQuadScene.add(mesh);
    
    this.clock = new THREE.Clock();
  }
  
  setAberration(amount) {
    this.uniforms.uAberration.value = amount;
  }
  
  setRedTint(amount) {
    this.uniforms.uRedTint.value = amount;
  }
  
  setGrainIntensity(amount) {
    this.uniforms.uGrainIntensity.value = amount;
  }
  
  resize(width, height) {
    this.renderTarget.setSize(width, height);
  }
  
  render(delta) {
    this.uniforms.uTime.value += delta;
    
    // Render scene to render target
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    
    // Render full-screen quad to screen
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.fsQuadScene, this.orthoCamera);
  }
  
  dispose() {
    this.renderTarget.dispose();
    this.fsQuadScene.children.forEach(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }
}
