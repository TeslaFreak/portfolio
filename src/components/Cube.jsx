import { useEffect } from "react";
import "./Cube.css";

export const Cube = ({}) => {
  useEffect(() => {
    const bg = document.querySelector(".container");
    window.addEventListener(
      "scroll",
      () => {
        bg.style.setProperty(
          "--scroll",
          //this will rotate 1 full rotation. scroll track is 300vh or 3 * innerHeight,
          //be sure to subtract 1 innerHeight from the scroll track height so that it
          //finishes spinning before the user scrolls past
          Math.min(window.scrollY / (window.innerHeight * 2), 1)
        );
      },
      false
    );
  }, []);
  return (
    <div class="container">
      <div class="cube-wrapper">
        <div class="cube cube-left">
          <div class="cube-face-1 cube-face">
            <NamePlate />
          </div>
          <div class="cube-face-2 cube-face">
            <NamePlate />
          </div>
          <div class="cube-face-3 cube-face">
            <NamePlate />
          </div>
          <div class="cube-face-4 cube-face">
            <NamePlate />
          </div>
        </div>
        <div class="cube cube-right">
          <div class="cube-face-1 cube-face">
            <img
              src="https://df48mz0agshoc.cloudfront.net/DJI_0062.JPG"
              class="cube-image"
            />
          </div>

          <div class="cube-face-2 cube-face">
            <img
              src="https://df48mz0agshoc.cloudfront.net/DJI_0193.JPG"
              class="cube-image"
            />
          </div>
          <div class="cube-face-3 cube-face">
            <img
              src="https://df48mz0agshoc.cloudfront.net/DJI_0203.JPG"
              class="cube-image"
            />
          </div>
          <div class="cube-face-4 cube-face">
            <img
              src="https://df48mz0agshoc.cloudfront.net/DJI_0226.JPG"
              class="cube-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NamePlate = ({}) => {
  return (
    <>
      <h1>Chris</h1>
      <h1>(Allmon)</h1>
      <h1>Allmon</h1>
      <h1>(Chris)</h1>
    </>
  );
};
