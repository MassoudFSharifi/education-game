import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function Office() {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === false) {
      if (WebGL.isWebGLAvailable()) {
        ref.current = true;
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        );

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.set(28, 15, 0);
        controls.update();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xa3a3a3);

        //ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        scene.add(directionalLight);
        directionalLight.position.set(-12, 2, 0);

        // const directionalHelper = new THREE.DirectionalLightHelper(
        //   directionalLight
        // );
        // scene.add(directionalHelper);

        const geometry = new THREE.PlaneGeometry(25, 25);
        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.rotation.x = -0.5 * Math.PI;

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

          assetLoader.load("./3d/burger/scene.gltf", (gltf) => {
            const model = gltf.scene;
            function createBurgerInstance(x, y, z, rotationY) {
              const instance = model.clone();
              circleDesk.add(instance);
              instance.position.set(x, y, z);
              instance.rotation.y = (rotationY ? rotationY : 0.5) * Math.PI;
            }
            createBurgerInstance(0.18, 1, -0.05);
            createBurgerInstance(-0.08, 1, 0.16, -0.15);
            createBurgerInstance(-0.08, 1, -0.16, -0.85);
          });
        });

        assetLoader.load("./3d/simple-desk/scene.gltf", (gltf) => {
          const model = gltf.scene;

          function createDeskInstance(x, y, z, rotationY) {
            const desk = model.clone();
            plane.add(desk);
            desk.position.set(x, y, z);
            desk.rotation.x = 0.5 * Math.PI;
            desk.rotation.y = (rotationY ? rotationY : 0.5) * Math.PI;

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
          }

          createDeskInstance(-5, -5.1, 0);
          createDeskInstance(7, -6.6, 0, -0.5);
          createDeskInstance(-5, 7, 0);
          createDeskInstance(7, 5, 0, -0.5);
        });

        assetLoader.load("./3d/simple-chair/scene.gltf", (gltf) => {
          const model = gltf.scene;
          function createChairInstance(x, y, z, rotationY) {
            const instance = model.clone();
            plane.add(instance);
            instance.position.set(x, y, z);
            instance.rotation.x = 0.5 * Math.PI;
            instance.rotation.y = (rotationY ? rotationY : -0.5) * Math.PI;
            const scaleFactor = 2; // Change this value to adjust the size
            instance.scale.set(scaleFactor, scaleFactor, scaleFactor);
          }

          createChairInstance(-4, -6.8, 0);
          createChairInstance(6.3, -5, 0, 0.5);
          createChairInstance(-4.1, 5.3, 0);
          createChairInstance(6.2, 6.6, 0, 0.5);
          createChairInstance(2, 0.3, 0, -0.45);
          createChairInstance(-0.9, 1.8, 0, 0.15);
          createChairInstance(-0.9, -1.8, 0, 0.85);
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
