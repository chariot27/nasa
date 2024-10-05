import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass, OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./objects/sun";
import getData from "./getData";
import createMenu from "./utils/createMenu";
import Stars from "./objects/stars";
import Earth, { EarthMesh, LightsMesh, CloudsMesh } from "./objects/earth";
import show from "./utils/showObject";
import { Commet } from "./types/Commet";
import Moon from "./objects/moon";
import Mercury from "./objects/mercury";
import Jupiter from "./objects/jupiter";
import Venus from "./objects/venus";
import Uranus from "./objects/urano";

// Global declaration
let scene;
let camera;
let renderer;
const canvas = document.getElementsByTagName("canvas")[0];

// Scene setup
scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

// Camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8;
camera.position.x = 0;
scene.add(camera);

// Default renderer setup
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = false;
controls.maxDistance = 500;

// add objects
//scene.add(sun);

// add earth
let earthMesh = EarthMesh()
let lightsMesh = LightsMesh()
let cloudsMesh = CloudsMesh()
const earth = Earth(earthMesh, lightsMesh, cloudsMesh)
scene.add(earth)

// add moon
let moon = Moon()
moon.position.set(5, 0, 0)
moon.scale.set(0.272, 0.272, 0.272)
scene.add(moon)

let  mercury=Mercury()
 mercury.position.set(8, 0, 0)
 //scene.add(mercury)

let jupiter=Jupiter()
 jupiter.position.set(15, 0, 0)
 //scene.add(jupiter)

 let venus = Venus()
venus.position.set(9, 0, 0)
//scene.add(venus)

let urano = Uranus()
urano.position.set(14, 0, 0)
scene.add(urano)


 
// Galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// Galaxy material
const textureLoader = new THREE.TextureLoader();
const starMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load("/textures/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// Galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Sun light
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
sunLight.layers.set(1);
scene.add(sunLight);

// Resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const animate = () => {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  starMesh.rotation.y += 0.001;
  camera.layers.set(1);
};

(async () => {
  const COMMETS = await getData()
  if (COMMETS.length == 0) {
    console.log("nao foi encontrado nenhum cometa")
  } else {
    createMenu(COMMETS);
  }
  animate();
})();
