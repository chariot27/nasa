import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three"
function Meteor() {

  const loader = new THREE.TextureLoader();
  const geometry = new THREE.IcosahedronGeometry(1, 12);

  const moonMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/moonmap2k.jpg"),
  });
  const moonMesh = new THREE.Mesh(geometry, moonMat);
  moonMesh.layers.set(1)
  moonMesh.scale.set(0.1, 0.1, 0.1)

  return moonMesh

}

export default Meteor

