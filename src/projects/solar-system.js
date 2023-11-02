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
        const venus = createPlanet(5.8, "venus.jpg", 44);
        const earth = createPlanet(6, "earth.jpg", 62);
        const mars = createPlanet(4, "mars.jpg", 78);
        const jupiter = createPlanet(12, "jupiter.jpg", 100);
        const saturn = createPlanet(10, "saturn.jpg", 138, {
          innerRadius: 10,
          outerRadius: 20,
          texture: "saturn-ring.png",
        });
        const uranus = createPlanet(7, "uranus.jpg", 176, {
          innerRadius: 7,
          outerRadius: 12,
          texture: "uranus-ring.png",
        });
        const neptune = createPlanet(7, "neptune.jpg", 200);
        const pluto = createPlanet(2.8, "pluto.jpg", 216);

        const pointLight = new THREE.PointLight(0xffffff, 100, 300, 1);
        scene.add(pointLight);

        function animation(time) {
          //self rotation
          sun.rotateY(0.004);
          mercury.mesh.rotateY(0.004);
          venus.mesh.rotateY(0.002);
          earth.mesh.rotateY(0.02);
          mars.mesh.rotateY(0.018);
          jupiter.mesh.rotateY(0.04);
          saturn.mesh.rotateY(0.038);
          uranus.mesh.rotateY(0.03);
          neptune.mesh.rotateY(0.032);
          pluto.mesh.rotateY(0.008);

          //around sun rotation
          mercury.object.rotateY(0.04);
          venus.object.rotateY(0.015);
          earth.object.rotateY(0.01);
          mars.object.rotateY(0.008);
          jupiter.object.rotateY(0.002);
          saturn.object.rotateY(0.0009);
          uranus.object.rotateY(0.0004);
          neptune.object.rotateY(0.0001);
          pluto.object.rotateY(0.00007);

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
