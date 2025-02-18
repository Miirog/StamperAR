import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

const nextButton = document.getElementById("nextObject");
const previousButton = document.getElementById("previousObject");
const bottomBox = document.getElementById("bottomBox");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x09341f, 0.4);

document.body.appendChild(renderer.domElement);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 8);
directionalLight1.position.set(1, 1, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 8);
directionalLight2.position.set(-1, 1, 1);
scene.add(directionalLight2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const loader = new GLTFLoader();

function loadModel(modelPath) {
  if (currentModel) {
    scene.remove(currentModel);
  }

  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      currentModel = model;

      model.scale.set(0.5, 0.5, 0.5);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x = -center.x;
      model.position.y = -center.y;
      model.position.z = -center.z;

      scene.add(model);

      camera.position.z = box.getSize(new THREE.Vector3()).length() * 1.5;
      controls.target.set(0, 0, 0);
      controls.update();

      bottomBox.querySelector("h2").textContent =
        bottomBoxTexts[currentModelIndex].title;
      bottomBox.querySelector("#description1").textContent =
        bottomBoxTexts[currentModelIndex].description1;
      bottomBox.querySelector("#description2").textContent =
        bottomBoxTexts[currentModelIndex].description2;
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error happened loading the model:", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let currentModel;
const modelPaths = [
  "./public/models/bocolla/bocolla.gltf",
  "./public/models/clip01/clip_seta01.gltf",
  "./public/models/clip02/clip_seta02.gltf",
  "./public/models/porca_rapida14/porca_rapida-modelo14.gltf",
  "./public/models/porca_rapida27/porca_rapida-modelo27.gltf",
  "./public/models/presilha_de_fogao/presilha_de_fogao.gltf",
];
let currentModelIndex = 0;

const bottomBoxTexts = [
  {
    title: "Bócolla Oblonga A",
    description1: "Amplo catálogo;",
    description2: "Diversidade de formatos e propriedades;",
  },
  {
    title: "Clip",
    description1: "Versatilidade;",
    description2: "Durabilidade & Segurança;",
  },
  {
    title: "Clip",
    description1: "Versatilidade;",
    description2: "Durabilidade & Segurança;",
  },
  {
    title: "Porca Rápida - 14",
    description1: "Praticidade;",
    description2: "Fácil Instalação;",
  },
  {
    title: "Porca Rápida - 27",
    description1: "Praticidade;",
    description2: "Fácil Instalação;",
  },
  {
    title: "Presilha de Fogão",
    description1: "Essencial no dia-a-dia;",
    description2: "Presente na sua cozinha;",
  },
];

loadModel(modelPaths[currentModelIndex]);

previousButton.addEventListener("click", () => {
  currentModelIndex =
    (currentModelIndex - 1 + modelPaths.length) % modelPaths.length;
  loadModel(modelPaths[currentModelIndex]);
});

nextButton.addEventListener("click", () => {
  currentModelIndex = (currentModelIndex + 1) % modelPaths.length;
  loadModel(modelPaths[currentModelIndex]);
});
