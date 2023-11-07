import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function Responsive() {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === false) {
      if (WebGL.isWebGLAvailable()) {
        ref.current = true;
        const renderer = new THREE.WebGLRenderer();
        const container = document.getElementById("scene-container");
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        );

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.set(18, 8, -15);
        controls.update();

        renderer.setClearColor(0x434343);

        //ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        const textureLoader = new THREE.TextureLoader();
        const geometry = new THREE.BoxGeometry(15, 18, 0.8);
        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: textureLoader.load("./assets/images/booth/floor.jpg"),
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.rotation.x = -0.5 * Math.PI;

        const wallGeometry = new THREE.BoxGeometry(8, 18);
        const wallMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: textureLoader.load("./assets/images/booth/wall.jpg"),
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        plane.add(wall);
        wall.rotation.y = -0.5 * Math.PI;
        wall.position.set(-7, 0, 3.5);

        //object loader
        const assetLoader = new GLTFLoader();

        const rgbaLoader = new RGBELoader();

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 4;

        assetLoader.load("./3d/circle-desk/scene.gltf", (gltf) => {
          const circleDesk = gltf.scene;
          plane.add(circleDesk);
          circleDesk.rotation.x = 0.5 * Math.PI;
          const scaleFactor = 4; // Change this value to adjust the size
          circleDesk.scale.set(scaleFactor, 1.5, scaleFactor);
          circleDesk.position.set(4, 6, 0.4);

          assetLoader.load("./3d/simple-chair/scene.gltf", (gltf) => {
            const model = gltf.scene;
            function createChairInstance(x, y, z, rotationY) {
              const instance = model.clone();
              circleDesk.add(instance);
              instance.position.set(x, y, z);

              instance.rotation.y = rotationY * Math.PI;

              instance.scale.set(0.5, 1.5, 0.5);
            }

            createChairInstance(-0.2, 0, -0.3, 0.2);
            createChairInstance(0.38, 0, 0, -0.5);
            createChairInstance(-0.2, 0, 0.33, 0.85);
          });
        });

        assetLoader.load("./3d/furniture/scene.gltf", (gltf) => {
          const furniture = gltf.scene;
          const furniture1 = furniture.clone();
          plane.add(furniture);

          furniture.rotation.x = 0.5 * Math.PI;
          furniture.rotation.y = 0.5 * Math.PI;
          const scaleFactor = 3;
          furniture.scale.set(scaleFactor, scaleFactor, scaleFactor);
          furniture.position.set(-4.2, -3, 0.4);
          plane.add(furniture1);
          furniture1.rotation.x = 0.5 * Math.PI;
          furniture1.rotation.y = 1 * Math.PI;
          const scaleFactor1 = 3;
          furniture1.scale.set(scaleFactor1, scaleFactor1, scaleFactor1);
          furniture1.position.set(1, -7.2, 0.4);
        });

        assetLoader.load("./3d/avali-circle-table/scene.gltf", (gltf) => {
          const circleTable = gltf.scene;
          plane.add(circleTable);
          circleTable.rotation.x = 0.5 * Math.PI;
          const scaleFactor = 0.0025;
          circleTable.scale.set(scaleFactor, scaleFactor, scaleFactor);
          circleTable.position.set(0.5, -3.2, 0.4);
        });

        assetLoader.load("./3d/flower-vase/scene.gltf", (gltf) => {
          const flowerVase = gltf.scene;
          plane.add(flowerVase);
          flowerVase.rotation.x = 0.5 * Math.PI;
          flowerVase.rotation.y = 0.5 * Math.PI;
          const scaleFactor = 0.6;
          flowerVase.scale.set(scaleFactor, scaleFactor, scaleFactor);
          flowerVase.position.set(-4.2, 1, 1.3);
        });

        assetLoader.load("./3d/simple-desk/scene.gltf", (gltf) => {
          const model = gltf.scene;

          function createDeskInstance(x, y, z) {
            const desk = model.clone();
            plane.add(desk);
            desk.position.set(x, y, z);
            desk.rotation.x = 0.5 * Math.PI;
            desk.rotation.y = -0.5 * Math.PI;

            assetLoader.load("./3d/desktop.glb", (gltf) => {
              const model = gltf.scene;
              desk.add(model);
              model.position.set(-1.5, 1.85, 0.5);
            });
            assetLoader.load("./3d/shaylushay/scene.gltf", (gltf) => {
              const model = gltf.scene;
              desk.add(model);
              model.position.set(-1.8, 0.5, 0.8);
              model.rotation.y = 1 * Math.PI;
              const scaleFactor = 0.4; // Change this value to adjust the size
              model.scale.set(0.35, 0.45, scaleFactor);
            });
            assetLoader.load("./3d/simpl-modern-chair/scene.gltf", (gltf) => {
              const model = gltf.scene;
              desk.add(model);
              model.position.set(-1.8, 0.5, 0.8);
              model.rotation.y = 1 * Math.PI;
              const scaleFactor = 3; // Change this value to adjust the size
              model.scale.set(2, 1, scaleFactor);
            });
          }

          createDeskInstance(-4.2, 5.4, 0);
        });

        function animation(time) {
          renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animation);

        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      } else {
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById("container").appendChild(warning);
      }
    }
  }, []);
  return null;
}
