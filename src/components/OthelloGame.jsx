import React, { FC, useEffect } from "react";
import * as THREE from "three";

export const OthelloGame = ({}) => {
  useEffect(() => {
    let cubeMaterialsBlackWhite = [
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Right side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Top side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Bottom side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Front side
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Back side
    ];
    let cubeMaterialsWhiteBlack = [
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Right side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Top side
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Bottom side
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Front side
      new THREE.MeshBasicMaterial({ color: 0x000000 }), // Back side
    ];
    let rotatingCube = null;
    let targetRotation = Math.PI;
    let currentRotation = 0;
    let startingRotation = 0;
    const raycaster = new THREE.Raycaster();
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2();
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaaaaa);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const scene = new THREE.Scene();

    createGrid();
    animate();

    function animate() {
      if (rotatingCube && currentRotation === 0) {
        startingRotation = rotatingCube.rotation.y;
        currentRotation = rotatingCube.rotation.y;
        targetRotation = rotatingCube.rotation.y + Math.PI;
      }
      if (rotatingCube && currentRotation <= targetRotation) {
        let time = clock.getElapsedTime() * 5;
        rotatingCube.rotation.y = time + startingRotation;
        currentRotation = time + startingRotation;
      } else if (rotatingCube && currentRotation >= targetRotation) {
        rotatingCube.rotation.y =
          targetRotation >= Math.PI * 2 ? 0 : targetRotation;
        rotatingCube = null;
        currentRotation = 0;
        startingRotation = 0;
        targetRotation = Math.PI;
        clock.stop();
      }
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    function createGrid() {
      const gridWidth = 8;

      // Use vmin for the scale factor
      let scale = Math.min(window.innerWidth, window.innerHeight) * 0.1;
      let boxSize = scale;
      let spacing = scale * 1.1;

      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
          let geometry = new THREE.BoxGeometry(boxSize, boxSize, 0.1);
          let material;
          let cube;
          if ((i == 3 && j == 4) || (j == 3 && i == 4)) {
            cube = new THREE.Mesh(geometry, cubeMaterialsWhiteBlack);
          } else if ((i == 3 && j == 3) || (j == 4 && i == 4)) {
            cube = new THREE.Mesh(geometry, cubeMaterialsBlackWhite);
          } else {
            material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            cube = new THREE.Mesh(geometry, material);
          }

          cube.position.set(
            (i - gridWidth / 2) * spacing + spacing / 2,
            (j - gridWidth / 2) * spacing + spacing / 2,
            0
          );
          scene.add(cube);
        }
      }

      // Adjust the camera's position to fit the grid based on the vmin
      camera.position.z =
        (gridWidth * spacing) /
        (2 * Math.tan((0.5 * camera.fov * Math.PI) / 180));
    }

    function onDocumentMouseDown(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        rotatingCube = intersects[0].object;
        currentRotation = 0;
        clock.start();
      }
    }

    function onWindowResize() {
      // Adjust the renderer, camera, and re-create the grid
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // Clear the existing grid and re-create it to adjust for the new window size
      for (let i = scene.children.length - 1; i >= 0; i--) {
        let object = scene.children[i];
        scene.remove(object);
      }
      createGrid();
      renderer.render(scene, camera);
    }
    window.addEventListener("resize", onWindowResize, false);

    document.addEventListener("mousedown", onDocumentMouseDown, false);
  }, []);

  return (
    <canvas
      id="c"
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};
