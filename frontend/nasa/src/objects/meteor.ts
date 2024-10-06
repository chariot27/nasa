import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three"

function RandomSize() {
  const randomNum = Math.random() * (0.10 - 0.05) + 0.05;
  return randomNum
}

function Meteor() {

  const geometry = new THREE.IcosahedronGeometry(1, 12);

  const meteorMat = new THREE.MeshBasicMaterial({
    color: 0x808080
  });
  const meteorMesh = new THREE.Mesh(geometry, meteorMat);
  meteorMesh.layers.set(1)
  meteorMesh.scale.set(RandomSize(), RandomSize(), RandomSize())

  return meteorMesh
}

export default Meteor

