import * as THREE from 'three';

export default class CharacterFactory {
  constructor() {
    this.suitColors = ['#1a1a2e', '#2d2d3f', '#3a3a4a', '#252535', '#1e2832'];
    this.hairColors = ['#3e2723', '#212121', '#424242'];
    this.tieColors = ['#b71c1c', '#0d47a1', '#757575', null];
    this.geometries = [];
    this.materials = [];
  }

  _createBox(w, h, d) {
    const geo = new THREE.BoxGeometry(w, h, d);
    this.geometries.push(geo);
    return geo;
  }
  
  _createSphere(r) {
    const geo = new THREE.SphereGeometry(r, 16, 16);
    this.geometries.push(geo);
    return geo;
  }

  _createMaterial(params) {
    const mat = new THREE.MeshStandardMaterial(params);
    this.materials.push(mat);
    return mat;
  }

  createClerk({ position, side, isAnomaly = false, anomalyType = null }) {
    const root = new THREE.Group();
    root.position.set(position.x, position.y, position.z);
    
    // Orient based on side of the train
    root.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;

    const suitColor = this.suitColors[Math.floor(Math.random() * this.suitColors.length)];
    const hairColor = this.hairColors[Math.floor(Math.random() * this.hairColors.length)];
    const tieColor = this.tieColors[Math.floor(Math.random() * this.tieColors.length)];
    const skinToneVariations = [0xd4b896, 0xc6a886, 0xe2c8a6, 0xb89876, 0x8d6e63];
    const skinColor = skinToneVariations[Math.floor(Math.random() * skinToneVariations.length)];
    const scaleY = 0.95 + Math.random() * 0.1;

    const suitMat = this._createMaterial({ color: suitColor, roughness: 0.7, metalness: 0.1 });
    const skinMat = this._createMaterial({ color: skinColor, roughness: 0.6 });
    const hairMat = this._createMaterial({ color: hairColor, roughness: 0.9 });
    const eyeWhiteMat = this._createMaterial({ color: 0xffffff, roughness: 0.2 });
    const irisMat = this._createMaterial({ color: 0x000000, roughness: 0.1 });
    const mouthMat = this._createMaterial({ color: 0x4a142c, roughness: 0.8 });
    const shoeMat = this._createMaterial({ color: 0x111111, roughness: 0.5 });
    const pantsMat = this._createMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const shirtMat = this._createMaterial({ color: 0xffffff, roughness: 0.9 });

    const body = new THREE.Group();
    body.position.y = 0.5; // Seated hip height
    body.scale.set(1, scaleY, 1);
    root.add(body);

    const torsoGeo = this._createBox(0.45, 0.6, 0.25);
    const torso = new THREE.Mesh(torsoGeo, suitMat);
    torso.position.y = 0.3; // middle of torso relative to hips
    body.add(torso);

    const collarGeo = this._createBox(0.3, 0.05, 0.26);
    const collar = new THREE.Mesh(collarGeo, shirtMat);
    collar.position.y = 0.275;
    torso.add(collar);

    if (tieColor) {
      const tieGeo = this._createBox(0.04, 0.4, 0.02);
      const tieMat = this._createMaterial({ color: tieColor, roughness: 0.8 });
      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.set(0, -0.05, 0.13);
      torso.add(tie);
    }

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.35, 0);
    torso.add(headGroup);

    const headGeo = this._createBox(0.24, 0.28, 0.24);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    const hairGeo = this._createBox(0.26, 0.08, 0.26);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 0.14;
    headGroup.add(hair);

    const createEye = (x) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(x, 0.02, 0.12);
      const eyeWhite = new THREE.Mesh(this._createSphere(0.028), eyeWhiteMat);
      const iris = new THREE.Mesh(this._createSphere(0.012), irisMat);
      iris.position.z = 0.02;
      eyeGroup.add(eyeWhite);
      eyeGroup.add(iris);
      return eyeGroup;
    };

    const leftEye = createEye(-0.05);
    const rightEye = createEye(0.05);
    headGroup.add(leftEye);
    headGroup.add(rightEye);

    const mouthGeo = this._createBox(0.1, 0.015, 0.01);
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, -0.06, 0.12);
    headGroup.add(mouth);

    const createArm = (xSign, isLeft) => {
      const armGroup = new THREE.Group();
      armGroup.position.set(xSign * 0.28, 0.25, 0);
      
      const upperArm = new THREE.Mesh(this._createBox(0.1, 0.3, 0.1), suitMat);
      upperArm.position.y = -0.15;
      armGroup.add(upperArm);

      const forearmGroup = new THREE.Group();
      forearmGroup.position.set(0, -0.3, 0);
      armGroup.add(forearmGroup);

      // Resting on thigh (seated) - bend elbow forward
      forearmGroup.rotation.x = -Math.PI / 2;

      const forearmMesh = new THREE.Mesh(this._createBox(0.09, 0.28, 0.09), suitMat);
      forearmMesh.position.y = -0.14;
      forearmGroup.add(forearmMesh);

      const hand = new THREE.Mesh(this._createBox(0.08, 0.1, 0.04), skinMat);
      hand.position.y = -0.33;
      forearmGroup.add(hand);

      const numFingers = (isAnomaly && anomalyType === 'finger_count' && isLeft) ? 6 : 5;
      for (let i = 0; i < numFingers; i++) {
        const finger = new THREE.Mesh(this._createBox(0.015, 0.06, 0.015), skinMat);
        finger.position.set(-0.03 + (i * 0.015), -0.08, 0);
        hand.add(finger);
      }

      return { armGroup, forearmGroup, hand };
    };

    const leftArmData = createArm(-1, true);
    const rightArmData = createArm(1, false);
    torso.add(leftArmData.armGroup);
    torso.add(rightArmData.armGroup);

    const createLeg = (xSign) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(xSign * 0.12, -0.3, 0);

      // Seated - thighs horizontal
      legGroup.rotation.x = -Math.PI / 2;

      const thigh = new THREE.Mesh(this._createBox(0.13, 0.35, 0.13), pantsMat);
      thigh.position.y = -0.175;
      legGroup.add(thigh);

      const shinGroup = new THREE.Group();
      shinGroup.position.y = -0.35;
      legGroup.add(shinGroup);

      // Shins hanging down
      shinGroup.rotation.x = Math.PI / 2;

      const shin = new THREE.Mesh(this._createBox(0.11, 0.35, 0.11), pantsMat);
      shin.position.y = -0.175;
      shinGroup.add(shin);

      const shoe = new THREE.Mesh(this._createBox(0.12, 0.06, 0.18), shoeMat);
      shoe.position.set(0, -0.38, 0.03);
      shinGroup.add(shoe);

      return { legGroup, shinGroup };
    };

    const leftLegData = createLeg(-1);
    const rightLegData = createLeg(1);
    torso.add(leftLegData.legGroup);
    torso.add(rightLegData.legGroup);

    if (isAnomaly && anomalyType === 'backwards_one') {
      torso.rotation.y = Math.PI;
      headGroup.rotation.y = Math.PI; // Counter-rotate head to keep it facing forward
    }

    if (isAnomaly && anomalyType === 'shadow') {
      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
        }
      });
    } else {
      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    const limbs = {
      head: headGroup,
      leftEye,
      rightEye,
      mouth,
      torso,
      body,
      leftUpperArm: leftArmData.armGroup,
      leftForearm: leftArmData.forearmGroup,
      rightUpperArm: rightArmData.armGroup,
      rightForearm: rightArmData.forearmGroup,
      leftThigh: leftLegData.legGroup,
      leftShin: leftLegData.shinGroup,
      rightThigh: rightLegData.legGroup,
      rightShin: rightLegData.shinGroup,
      leftHand: leftArmData.hand,
      rightHand: rightArmData.hand,
    };

    return { group: root, limbs, isAnomaly, anomalyType };
  }

  dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.geometries = [];
    this.materials = [];
  }
}
