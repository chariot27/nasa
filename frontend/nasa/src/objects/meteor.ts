import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three"
import { getFresnelMat } from '../utils/getFresnelMat';
function RandomSize() {
  const randomNum = Math.random() * (0.10 - 0.05) + 0.05;
  return randomNum
}
const geometry = new THREE.IcosahedronGeometry(1, 12);

function MeteorMesh() {

  const meteorMat = new THREE.MeshBasicMaterial({
    color: 0x808080
  });
  const meteorMesh = new THREE.Mesh(geometry, meteorMat);
  meteorMesh.layers.set(1)
  meteorMesh.scale.set(RandomSize(), RandomSize(), RandomSize())

  return meteorMesh

}

function MeteorGlow() {
  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(0.12);
  glowMesh.layers.set(1)
  glowMesh.name = "selected"
  glowMesh.visible = false
  return glowMesh
}

function Meteor() {
  const meteorGroup = new THREE.Group()
  const meteorMesh = MeteorMesh()
  meteorGroup.add(meteorMesh)

  const meteorGlow = MeteorGlow()
  meteorGroup.add(meteorGlow)
  console.log(meteorGroup)
  return meteorGroup
}

export default Meteor

