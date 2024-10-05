import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass, OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./objects/sun";
import getData from "./getData";
import createMenu from "./utils/createMenu";

// Global declarations
let scene;
let camera;
let renderer;
const canvas = document.getElementsByTagName("canvas")[0];
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

// Bloom renderer setup
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; // Intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// Add sun object to the scene
scene.add(sun);

// Galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// Galaxy material
const textureLoader = new THREE.TextureLoader();
const starMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load("/public/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// Galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

// Ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

// Resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  starMesh.rotation.y += 0.001;
  camera.layers.set(1);
  bloomComposer.render();
};

animate();
const COMMETS = getData();
createMenu(COMMETS);