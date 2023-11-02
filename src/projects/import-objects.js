import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function ImportObjects() {
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

        camera.position.set(35, 7, 0);
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

        let car;

        rgbaLoader.load(
          "./3d/free_porsche_911_carrera_4s/MR_INT-005_WhiteNeons_NAD.hdr",
          (texture) => {
            texture.mapping = THREE.EquirectangularRefractionMapping;
            scene.environment = texture;
            assetLoader.load(
              "./3d/free_porsche_911_carrera_4s/scene.gltf",
              (gltf) => {
                const model = gltf.scene;
                plane.add(model);
                model.position.set(-10.5, 10.5, 0.7);
                model.rotation.x = 0.5 * Math.PI;
                model.rotation.y = 0.25 * Math.PI;
              }
            );
            assetLoader.load(
              "./3d/free_porsche_911_carrera_4s/scene.gltf",
              (gltf) => {
                const model = gltf.scene;
                plane.add(model);
                model.position.set(10.5, 10.5, 0.7);
                model.rotation.x = 0.5 * Math.PI;
                model.rotation.y = -0.25 * Math.PI;
              }
            );
            assetLoader.load(
              "./3d/free_porsche_911_carrera_4s/scene.gltf",
              (gltf) => {
                const model = gltf.scene;
                plane.add(model);
                model.position.set(10.5, -10.5, 0.7);
                model.rotation.x = 0.5 * Math.PI;
                model.rotation.y = -0.75 * Math.PI;
              }
            );
            assetLoader.load(
              "./3d/free_porsche_911_carrera_4s/scene.gltf",
              (gltf) => {
                const model = gltf.scene;
                plane.add(model);
                model.position.set(-10.5, -10.5, 0.7);
                model.rotation.x = 0.5 * Math.PI;
                model.rotation.y = 0.75 * Math.PI;
              }
            );
          }
        );

        assetLoader.load(
          "./3d/free_porsche_911_carrera_4s/scene.gltf",
          (gltf) => {
            const model = gltf.scene;
            plane.add(model);
            model.position.set(0, 0, 0.7);
            model.rotation.x = 0.5 * Math.PI;
            model.rotation.y = 0.5 * Math.PI;
            car = model;
          }
        );
        function animation(time) {
          if (car) car.rotation.y = time / 1000;

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
