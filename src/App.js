// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import deep from "./deepblue.png";
import logo from "./logo.png";
import WebGL from "three/addons/capabilities/WebGL.js";
import dat from "dat.gui";

export default function App() {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === false) {
      if (WebGL.isWebGLAvailable()) {
        ref.current = true;

        const camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
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

        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.castShadow = true;

        const planeGeometry = new THREE.PlaneGeometry(50, 50);
        const planeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);
        plane.receiveShadow = true;

        const gridHelper = new THREE.GridHelper(50);
        scene.add(gridHelper);

        const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: 0x0000ff,
          wireframe: false,
        });

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        sphere.castShadow = true;

        plane.rotation.x = -0.5 * Math.PI;
        sphere.position.set(10, 10, 10);

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

        // renderer.setClearColor(0xffffff);
        // const textureLoader = new THREE.TextureLoader();
        // scene.background = textureLoader.load(deep);

        const cubTextureLoader = new THREE.CubeTextureLoader();
        scene.background = cubTextureLoader.load([
          deep,
          deep,
          logo,
          logo,
          logo,
          logo,
        ]);

        // scene.fog = new THREE.Fog(0xffffff, 0, 200);

        scene.fog = new THREE.FogExp2(0xffffff, 0.001);

        const gui = new dat.GUI();

        const options = {
          sphereColor: "#ffea00",
          gridHelper: "#ffffff",
          wireframe: false,
          speed: 0.01,
          angle: 0.2,
          penumbra: 0,
          intensity: 1,
          decay: -2,
        };

        gui.addColor(options, "sphereColor").onChange((e) => {
          sphere.material.color.set(e);
        });

        gui.addColor(options, "gridHelper").onChange((e) => {
          gridHelper.material.color.set(e);
        });
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

        let step = 0;

        function animation(time) {
          mesh.rotation.x = time / 2000;
          mesh.rotation.y = time / 2000;
          mesh.rotation.z = time / 2000;

          step += options.speed;
          sphere.position.y = 10 * Math.abs(Math.sin(step));

          spotLight.angle = options.angle;
          spotLight.intensity = options.intensity;
          spotLight.penumbra = options.penumbra;
          spotLight.decay = options.decay;

          lightHelper.update();

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
