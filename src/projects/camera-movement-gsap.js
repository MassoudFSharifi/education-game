import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import gsap from "gsap";

export default function CameraMovementGSAP() {
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

        camera.position.set(0, 2, 5);
        controls.update();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xa3a3a3);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: 0x00ff00,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const gridHelper = new THREE.GridHelper(30, 30);
        scene.add(gridHelper);

        const tl = gsap.timeline();
        window.addEventListener("mousedown", () => {
          tl.to(camera.position, {
            z: 14,
            duration: 1.5,
            onUpdate: () => {
              camera.lookAt(0, 0, 0);
            },
          })
            .to(camera.position, {
              y: 14,
              duration: 1.5,
              onUpdate: () => {
                camera.lookAt(0, 0, 0);
              },
            })
            .to(camera.position, {
              x: 10,
              y: 5,
              z: 3,
              duration: 1.5,
              onUpdate: () => {
                camera.lookAt(0, 0, 0);
              },
            });
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
