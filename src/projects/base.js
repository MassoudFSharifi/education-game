// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import deep from "../deepblue.png";
import logo from "../logo.png";
import WebGL from "three/addons/capabilities/WebGL.js";
import dat from "dat.gui";

const honeyUrl = new URL("../3d/honey.glb", import.meta.url);

export default function Basic() {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === false) {
      if (WebGL.isWebGLAvailable()) {
        ref.current = true;

        const shipUrl = new URL("../3d/ship.glb", import.meta.url);

        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        camera.position.set(-10, 100, 30);
        // camera.lookAt(0, 0, 0);
        const controls = new OrbitControls(camera, renderer.domElement);
        const scene = new THREE.Scene();
        // scene.background = 0xffffff;

        // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        // const points = [];
        // points.push(new THREE.Vector3(-10, 0, 0));
        // points.push(new THREE.Vector3(0, 10, 0));
        // points.push(new THREE.Vector3(10, 0, 0));
        // points.push(new THREE.Vector3(20, 0, 0));
        // points.push(new THREE.Vector3(0, 0, 10));
        // points.push(new THREE.Vector3(-10, 0, 0));

        // const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // const line = new THREE.Line(geometry, material);
        // scene.add(line);

        const textureLoader = new THREE.TextureLoader();
        const geometry1 = new THREE.BoxGeometry(5, 5, 5);
        const material1 = [
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(logo),
          }),
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(logo),
          }),
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(deep),
          }),
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(deep),
          }),
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(logo),
          }),
          new THREE.MeshStandardMaterial({
            map: textureLoader.load(deep),
          }),
        ];
        const mesh1 = new THREE.Mesh(geometry1, material1);
        scene.add(mesh1);
        mesh1.position.set(-10, 20, 10);

        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({
          color: 0x00ff00,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.castShadow = true;

        const planeGeometry = new THREE.PlaneGeometry(50, 50, 30);
        const planeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);
        plane.receiveShadow = true;
        plane.rotation.x = 180;
        plane.rotation.z = 44;

        // plane.rotation.y = 1 * Math.PI;

        // const gridHelper = new THREE.GridHelper(50);
        // scene.add(gridHelper);

        const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: 0x0000ff,
          wireframe: false,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        sphere.castShadow = true;
        sphere.position.set(10, 10, 10);

        const sphereGeometry1 = new THREE.SphereGeometry(10);
        const sphere1Material = new THREE.MeshBasicMaterial({
          map: textureLoader.load("./assets/sun.jpg"),
        });
        const sphere1 = new THREE.Mesh(sphereGeometry1, sphere1Material);
        scene.add(sphere1);
        sphere1.position.set(-10, 10, -20);

        const mercuryGeo = new THREE.SphereGeometry(4);
        const mercuryMat = new THREE.MeshStandardMaterial({
          map: textureLoader.load("./assets/sun.jpg"),
        });
        const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
        sphere1.add(mercury);
        mercury.position.set(-10, 10, -20);

        // const light = new THREE.AmbientLight(0xffffff); // soft white light
        // scene.add(light);

        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        // scene.add(directionalLight);
        // directionalLight.castShadow = true;
        // directionalLight.position.set(20, 20, 20);
        // directionalLight.shadow.camera.bottom = -12;
        // const directionalHelper = new THREE.DirectionalLightHelper(
        //   directionalLight,
        //   40
        // );
        // scene.add(directionalHelper);

        // const dLightShadowHelper = new THREE.CameraHelper(
        //   directionalLight.shadow.camera
        // );
        // scene.add(dLightShadowHelper);

        // const hemisphere = new THREE.HemisphereLight(0xfffff, 0xfffddd, 1);
        // scene.add(hemisphere);

        // const hemisphereHelper = new THREE.HemisphereLightHelper(
        //   hemisphere,
        //   30
        // );
        // scene.add(hemisphereHelper);

        // const pointLight = new THREE.PointLight(0xffffff, 1, 0, 3);
        // pointLight.position.set(20, 20, 20);
        // scene.add(pointLight);

        // const pointHelper = new THREE.PointLightHelper(pointLight, 6);
        // scene.add(pointHelper);

        // const width = 30;
        // const height = 30;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight(
        //   0xffffff,
        //   intensity,
        //   width,
        //   height
        // );
        // rectLight.position.set(23, 5, 0);
        // rectLight.lookAt(0, 0, 0);
        // scene.add(rectLight);
        // rectLight.castShadow = true;

        //spot light
        let spotLight, lightHelper;

        spotLight = new THREE.SpotLight(0xffffff, 100);
        spotLight.position.set(100, 100, 100);
        spotLight.angle = 0.2;
        spotLight.penumbra = 0.5;
        spotLight.decay = 0;
        spotLight.distance = 1000;
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 1000;
        scene.add(spotLight);

        lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(lightHelper);

        renderer.setClearColor(0xffffff);
        // const textureLoader = new THREE.TextureLoader();
        // scene.background = textureLoader.load("./assets/px.jpg");

        //cubemap
        const path = "./assets/images/shar/";
        const format = ".jpg";
        const urls = [
          path + "px" + format,
          path + "nx" + format,
          path + "py" + format,
          path + "ny" + format,
          path + "pz" + format,
          path + "nz" + format,
        ];
        const reflectionCube = new THREE.CubeTextureLoader().load(urls);
        // const refractionCube = new THREE.CubeTextureLoader().load(urls);
        // refractionCube.mapping = THREE.CubeRefractionMapping;

        scene.background = reflectionCube;

        // scene.fog = new THREE.Fog(0xffffff, 0, 200);

        scene.fog = new THREE.FogExp2(0xffffff, 0.001);

        //object loader
        const assetLoader = new GLTFLoader();

        assetLoader.load(
          honeyUrl.href,
          (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            model.position.set(20, 10, -20);
            model.rotation.y = 200;
          },
          undefined,
          (error) => {
            console.log(error);
          }
        );

        // assetLoader.load(
        //   shipUrl.href,
        //   (gltf) => {
        //     const model = gltf.scene;
        //     scene.add(model);
        //     model.position.set(100, 10, -20);
        //     // model.rotation.y = 200;
        //   },
        //   undefined,
        //   (error) => {
        //     console.log(error);
        //   }
        // );

        const gui = new dat.GUI();

        const options = {
          sphereColor: "#ffea00",
          gridHelper: "#ffffff",
          wireframe: false,
          speed: 0.01,
          angle: 0.5,
          penumbra: 0,
          intensity: 1,
          decay: -2,
        };

        gui.addColor(options, "sphereColor").onChange((e) => {
          sphere.material.color.set(e);
        });

        // gui.addColor(options, "gridHelper").onChange((e) => {
        //   gridHelper.material.color.set(e);
        // });
        gui.add(options, "wireframe").onChange((e) => {
          sphere.material.wireframe = e;
        });
        gui.add(options, "speed", 0, 1);
        gui.add(options, "angle", 0, 1);
        gui.add(options, "penumbra", 0, 1);
        gui.add(options, "intensity", 0, 1);
        gui.add(options, "decay", -20, 2);

        renderer.setAnimationLoop(animation);
        renderer.render(scene, camera);
        controls.update();

        const mousePosition = new THREE.Vector2();

        window.addEventListener("mousemove", (e) => {
          mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
          mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        const rayCaster = new THREE.Raycaster();

        const sphereId = sphere.id;
        const planeId = plane.id;
        mesh1.name = "box1";

        let step = 0;

        function animation(time) {
          sphere1.rotateY(0.004);
          mercury.rotateY(0.004);

          mesh.rotation.x = time / 2000;
          mesh.rotation.y = time / 2000;
          mesh.rotation.z = time / 2000;

          step += options.speed;
          sphere.position.y = 10 * Math.abs(Math.sin(step));

          spotLight.angle = options.angle;
          spotLight.intensity = options.intensity;
          spotLight.penumbra = options.penumbra;
          // spotLight.decay = options.decay;
          lightHelper.update();

          rayCaster.setFromCamera(mousePosition, camera);
          const interceptors = rayCaster.intersectObjects(scene.children);
          for (let i = 0; i < interceptors.length; i++) {
            if (interceptors[i]?.object.id === sphereId) {
              interceptors[i]?.object.material.color.set(0x000000);
            }
            if (interceptors[i]?.object.name === "box1") {
              interceptors[i].object.rotation.x = time / 2000;
              interceptors[i].object.rotation.y = time / 2000;
              interceptors[i].object.rotation.z = time / 2000;
            }
          }

          renderer.render(scene, camera);
        }
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

  return <div id="container"></div>;
}
