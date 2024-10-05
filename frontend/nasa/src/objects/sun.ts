import * as THREE from "three";
//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: color });
const sun = new THREE.Mesh(geometry, material);
sun.position.set(0, 0, 0);
sun.layers.set(1);

export default sun

