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

  const handleClick = (src) => {
    window.open(src, "_blank");
  };
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
          <a
            class="cube-face-1 cube-face linkwrap"
            href="https://escapeoverseer.com"
            target="_blank"
          >
            <div class="blocker" />
            <iframe
              src="https://escapeoverseer.com"
              width="100%"
              height="100%"
            />
          </a>

          <a
            class="cube-face-2 cube-face"
            href="https://escapeoverseer.com"
            target="_blank"
          >
            <div class="blocker" />
            <iframe
              src="https://escapeoverseer.com"
              width="100%"
              height="100%"
            />
          </a>
          <a
            class="cube-face-3 cube-face"
            href="https://youtu.be/C1pZnfNyQQo?si=Fq_3eVe9Shr3LIqX"
            target="_blank"
          >
            <img src="fuihero.jpg" class="cube-image object-cover" />
          </a>
          <a
            class="cube-face-4 cube-face"
            href="https://www.jayhawkmotorsports.org/"
            target="_blank"
          >
            <img src="jhmotohero.jpg" class="cube-image object-cover" />
          </a>
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
