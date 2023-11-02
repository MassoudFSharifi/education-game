import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";

export default function SolarSystem() {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === false) {
      if (WebGL.isWebGLAvailable()) {
        ref.current = true;
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        );

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.set(-90, 140, 140);
        controls.update();

        renderer.setSize(window.innerWidth, window.innerHeight);

        //ambient light
        const ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);

        const path = "./assets/images/solar-system/";

        //background
        const starTexture = path + "stars.jpg";
        const reflectionCube = new THREE.CubeTextureLoader().load([
          starTexture,
          starTexture,
          starTexture,
          starTexture,
          starTexture,
          starTexture,
        ]);
        scene.background = reflectionCube;

        const textureLoader = new THREE.TextureLoader();
        const sunGeo = new THREE.SphereGeometry(16, 30, 30);
        const sunMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(path + "sun.jpg"),
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);

        const createPlanet = (size, url, position, ring) => {
          const Geo = new THREE.SphereGeometry(size, 30, 30);
          const Mat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(path + url),
          });
          const mesh = new THREE.Mesh(Geo, Mat);
          const object = new THREE.Object3D();
          object.add(mesh);
          if (ring) {
            const ringGeo = new THREE.RingGeometry(
              ring.innerRadius,
              ring.outerRadius,
              32
            );
            const ringMat = new THREE.MeshBasicMaterial({
              map: textureLoader.load(path + ring.texture),
              side: THREE.DoubleSide,
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            object.add(ringMesh);
            ringMesh.position.x = position;
            ringMesh.rotation.x = -0.5 * Math.PI;
          }
          scene.add(object);
          mesh.position.x = position;

          return {
            mesh,
            object,
          };
        };

        const mercury = createPlanet(3.2, "mercury.jpg", 28);
        const saturn = createPlanet(10, "saturn.jpg", 138, {
          innerRadius: 10,
          outerRadius: 20,
          texture: "saturn-ring.png",
        });

        const pointLight = new THREE.PointLight(0xffffff, 100, 300, 1);
        scene.add(pointLight);

        function animation(time) {
          sun.rotateY(0.004);
          mercury.mesh.rotateY(0.004);
          mercury.object.rotateY(0.04);
          saturn.mesh.rotateY(0.038);
          saturn.object.rotateY(0.0009);

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
