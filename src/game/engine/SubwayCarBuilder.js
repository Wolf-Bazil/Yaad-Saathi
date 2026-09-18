import * as THREE from 'three';

export default class SubwayCarBuilder {
  constructor(scene) {
    this.scene = scene;
    
    // Shared materials
    this.materials = {
      floor: new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.9,
        metalness: 0.1
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: 0xe6e4db, // Off-white slightly yellowed
        roughness: 1.0,
        metalness: 0.0
      }),
      wallLeft: new THREE.MeshStandardMaterial({
        color: 0xdbd5c7, // Grimy beige
        roughness: 0.8,
        metalness: 0.0
      }),
      wallRight: new THREE.MeshStandardMaterial({
        color: 0xdbd5c7, // Grimy beige
        roughness: 0.8,
        metalness: 0.0
      }),
      doorMetal: new THREE.MeshStandardMaterial({
        color: 0x666666,
        roughness: 0.4,
        metalness: 0.8
      }),
      windowGlassDark: new THREE.MeshPhysicalMaterial({
        color: 0x050a14, // Dark blue-black
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.12,
        transmission: 0.1
      }),
      seatOrange: new THREE.MeshStandardMaterial({
        color: 0xd95a16,
        roughness: 0.3, // Slight sheen
        metalness: 0.1
      }),
      chromePole: new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.05,
        metalness: 0.95
      }),
      safetyStripe: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0x665500,
        emissiveIntensity: 0.5,
        roughness: 0.5
      }),
      grime: new THREE.MeshStandardMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.4,
        roughness: 1.0,
        depthWrite: false
      }),
      puddle: new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.0,
        metalness: 0.8,
        transparent: true,
        opacity: 0.6,
        depthWrite: false
      }),
      signScreen: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      })
    };
    
    // Dynamic sign setup
    this.signCanvas = document.createElement('canvas');
    this.signCanvas.width = 512;
    this.signCanvas.height = 256;
    this.signContext = this.signCanvas.getContext('2d');
    this.signTexture = new THREE.CanvasTexture(this.signCanvas);
    this.materials.signScreen.map = this.signTexture;
    
    this.carGroup = null;
  }
  
  buildCar(loopNumber) {
    this.carGroup = new THREE.Group();
    
    // 1. Floor
    const floorGeo = new THREE.BoxGeometry(12, 0.1, 3);
    const floor = new THREE.Mesh(floorGeo, this.materials.floor);
    floor.position.set(0, -0.05, 0); // Top of floor at y=0
    floor.receiveShadow = true;
    this.carGroup.add(floor);
    
    // 2. Ceiling
    const ceilingGeo = new THREE.BoxGeometry(12, 0.05, 3);
    const ceiling = new THREE.Mesh(ceilingGeo, this.materials.ceiling);
    ceiling.position.set(0, 2.8 + 0.025, 0); // Bottom of ceiling at y=2.8
    ceiling.receiveShadow = true;
    this.carGroup.add(ceiling);
    
    // 3. Left Wall
    const wallGeo = new THREE.BoxGeometry(12, 2.8, 0.1);
    const leftWall = new THREE.Mesh(wallGeo, this.materials.wallLeft);
    leftWall.position.set(0, 1.4, -1.5 - 0.05); // Inner face at z=-1.5
    leftWall.receiveShadow = true;
    leftWall.castShadow = true;
    this.carGroup.add(leftWall);
    
    // 4. Right Wall
    const rightWall = new THREE.Mesh(wallGeo, this.materials.wallRight);
    rightWall.position.set(0, 1.4, 1.5 + 0.05); // Inner face at z=1.5
    rightWall.receiveShadow = true;
    rightWall.castShadow = true;
    this.carGroup.add(rightWall);
    
    // 5. Back Wall (Door)
    const backWallGeo = new THREE.BoxGeometry(0.1, 2.8, 3);
    const backWall = new THREE.Mesh(backWallGeo, this.materials.doorMetal);
    backWall.position.set(-6 - 0.05, 1.4, 0);
    backWall.receiveShadow = true;
    backWall.castShadow = true;
    this.carGroup.add(backWall);
    
    // Back Door Window
    const backWindowGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const backWindow = new THREE.Mesh(backWindowGeo, this.materials.windowGlassDark);
    backWindow.position.set(-5.99, 1.6, 0);
    backWindow.rotation.y = Math.PI / 2;
    this.carGroup.add(backWindow);
    
    // 6. Front Exit (Doorframe)
    // Left pillar
    const pillarGeo = new THREE.BoxGeometry(0.2, 2.8, 0.2);
    const leftPillar = new THREE.Mesh(pillarGeo, this.materials.doorMetal);
    leftPillar.position.set(6, 1.4, -1.4);
    leftPillar.receiveShadow = true;
    leftPillar.castShadow = true;
    this.carGroup.add(leftPillar);
    
    // Right pillar
    const rightPillar = new THREE.Mesh(pillarGeo, this.materials.doorMetal);
    rightPillar.position.set(6, 1.4, 1.4);
    rightPillar.receiveShadow = true;
    rightPillar.castShadow = true;
    this.carGroup.add(rightPillar);
    
    // Top beam
    const beamGeo = new THREE.BoxGeometry(0.2, 0.2, 3.0);
    const topBeam = new THREE.Mesh(beamGeo, this.materials.doorMetal);
    topBeam.position.set(6, 2.7, 0);
    topBeam.receiveShadow = true;
    topBeam.castShadow = true;
    this.carGroup.add(topBeam);
    
    // 7. Bench Seats
    const seatBaseGeo = new THREE.BoxGeometry(1.8, 0.08, 0.45);
    const seatBackGeo = new THREE.BoxGeometry(1.8, 0.6, 0.05);
    
    const seatXPositions = [-4, -2, 0.5, 2.5];
    
    for (let i = 0; i < seatXPositions.length; i++) {
      const xPos = seatXPositions[i];
      
      // Left side seats
      const leftBase = new THREE.Mesh(seatBaseGeo, this.materials.seatOrange);
      leftBase.position.set(xPos, 0.5, -1.5 + 0.225 + 0.1); // Z offset to align with wall
      leftBase.castShadow = true;
      leftBase.receiveShadow = true;
      
      const leftBack = new THREE.Mesh(seatBackGeo, this.materials.seatOrange);
      leftBack.position.set(xPos, 0.5 + 0.04 + 0.3, -1.5 + 0.025 + 0.1);
      leftBack.castShadow = true;
      leftBack.receiveShadow = true;
      
      this.carGroup.add(leftBase, leftBack);
      
      // Right side seats
      const rightBase = new THREE.Mesh(seatBaseGeo, this.materials.seatOrange);
      rightBase.position.set(xPos, 0.5, 1.5 - 0.225 - 0.1);
      rightBase.castShadow = true;
      rightBase.receiveShadow = true;
      
      const rightBack = new THREE.Mesh(seatBackGeo, this.materials.seatOrange);
      rightBack.position.set(xPos, 0.5 + 0.04 + 0.3, 1.5 - 0.025 - 0.1);
      rightBack.castShadow = true;
      rightBack.receiveShadow = true;
      
      this.carGroup.add(rightBase, rightBack);
    }
    
    // 8. Handrail Poles
    const poleGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.3, 16);
    const polePositions = [
      { x: -3, z: -0.8 }, { x: -3, z: 0.8 },
      { x: -0.5, z: -0.8 }, { x: -0.5, z: 0.8 },
      { x: 1.5, z: -0.8 }, { x: 1.5, z: 0.8 }
    ];
    
    for (const pos of polePositions) {
      const pole = new THREE.Mesh(poleGeo, this.materials.chromePole);
      pole.position.set(pos.x, 1.15, pos.z); // Center vertically from 0 to 2.3
      pole.castShadow = true;
      this.carGroup.add(pole);
    }
    
    // 9. Overhead Handrails
    const horizontalPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 11, 16);
    // Rotate to lie horizontally along Z-axis
    horizontalPoleGeo.rotateZ(Math.PI / 2);
    
    const leftOverhead = new THREE.Mesh(horizontalPoleGeo, this.materials.chromePole);
    leftOverhead.position.set(0, 2.1, -0.8);
    leftOverhead.castShadow = true;
    this.carGroup.add(leftOverhead);
    
    const rightOverhead = new THREE.Mesh(horizontalPoleGeo, this.materials.chromePole);
    rightOverhead.position.set(0, 2.1, 0.8);
    rightOverhead.castShadow = true;
    this.carGroup.add(rightOverhead);
    
    // 10. Floor Safety Stripe
    const stripeGeo = new THREE.PlaneGeometry(12, 0.1);
    const stripe = new THREE.Mesh(stripeGeo, this.materials.safetyStripe);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(0, 0.001, 0); // Slightly above floor
    this.carGroup.add(stripe);
    
    // 11. Window Panels
    const windowGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const windowXPositions = [-4.5, -2.5, -0.5, 1.5, 3.5, 5.5];
    
    for (const x of windowXPositions) {
      // Left window
      const leftWin = new THREE.Mesh(windowGeo, this.materials.windowGlassDark);
      leftWin.position.set(x, 1.5, -1.49);
      this.carGroup.add(leftWin);
      
      // Right window
      const rightWin = new THREE.Mesh(windowGeo, this.materials.windowGlassDark);
      rightWin.position.set(x, 1.5, 1.49);
      rightWin.rotation.y = Math.PI; // Face inward
      this.carGroup.add(rightWin);
    }
    
    // 12. Loop Number Sign
    const signGeo = new THREE.PlaneGeometry(0.8, 0.3);
    const sign = new THREE.Mesh(signGeo, this.materials.signScreen);
    sign.position.set(-5.94, 2.4, 0); // Above back door
    sign.rotation.y = Math.PI / 2;
    this.carGroup.add(sign);
    this.updateLoopSign(loopNumber);
    
    // 13. Ceiling Grime
    const grimeGeo = new THREE.PlaneGeometry(0.5, 0.5);
    for (let i = 0; i < 20; i++) {
      const grime = new THREE.Mesh(grimeGeo, this.materials.grime);
      grime.position.set(
        (Math.random() - 0.5) * 11,
        2.79, // slightly below ceiling
        (Math.random() - 0.5) * 2.8
      );
      grime.rotation.x = Math.PI / 2;
      grime.rotation.z = Math.random() * Math.PI * 2;
      grime.scale.setScalar(Math.random() * 1.5 + 0.5);
      this.carGroup.add(grime);
    }
    
    // 14. Floor Puddles
    const puddleGeo = new THREE.PlaneGeometry(1.0, 1.0);
    for (let i = 0; i < 3; i++) {
      const puddle = new THREE.Mesh(puddleGeo, this.materials.puddle);
      puddle.position.set(
        (Math.random() - 0.5) * 8,
        0.002, // slightly above stripe
        (Math.random() - 0.5) * 2
      );
      puddle.rotation.x = -Math.PI / 2;
      puddle.rotation.z = Math.random() * Math.PI * 2;
      puddle.scale.set(
        Math.random() * 1 + 0.5,
        Math.random() * 1 + 0.5,
        1
      );
      this.carGroup.add(puddle);
    }
    
    if (this.scene) {
      this.scene.add(this.carGroup);
    }
    
    return this.carGroup;
  }
  
  updateLoopSign(number) {
    const ctx = this.signContext;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 512, 256);
    
    ctx.fillStyle = '#ff2222';
    ctx.font = 'bold 120px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Format number to be e.g. "LOOP 04"
    const text = `LOOP ${String(number).padStart(2, '0')}`;
    ctx.fillText(text, 256, 128);
    
    this.signTexture.needsUpdate = true;
  }
  
  disposeCar(carGroup) {
    if (!carGroup) return;
    
    if (this.scene) {
      this.scene.remove(carGroup);
    }
    
    // Only traverse children to dispose of geometries since materials are shared
    carGroup.traverse((object) => {
      if (object.isMesh && object.geometry) {
        object.geometry.dispose();
      }
    });
    
    // Dispose shared materials manually
    for (const key in this.materials) {
      if (this.materials[key].map) {
        this.materials[key].map.dispose();
      }
      this.materials[key].dispose();
    }
  }
}
