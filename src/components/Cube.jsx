import { useEffect } from "react";
import "./Cube.css";
import { FramedCubeFace } from "./FramedCubeFace";

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
    <div className="container">
      <div className="cube-wrapper">
        <div className="cube cube-left">
          <div className="cube-face-1 cube-face">
            <NamePlate />
          </div>
          <div className="cube-face-2 cube-face">
            <NamePlate />
          </div>
          <div className="cube-face-3 cube-face">
            <NamePlate />
          </div>
          <div className="cube-face-4 cube-face">
            <NamePlate />
          </div>
        </div>
        <div className="cube cube-right">
          <a
            className="cube-face-1 cube-face linkwrap"
            href="https://allmon.digital/unhhhh"
            target="_blank"
          >
            <FramedCubeFace color="#C6DEF1">
              <img src="comicqueen3.png" className="cube-image object-cover" />
            </FramedCubeFace>
          </a>

          <a
            className="cube-face-2 cube-face  linkwrap"
            href="/projects"
            target="_blank"
          >
            <FramedCubeFace color="#DBCDF0">
              <img src="projectshero.jpg" className="cube-image object-fill" />
            </FramedCubeFace>
          </a>
          <a
            className="cube-face-3 cube-face linkwrap"
            href="https://escapeoverseer.com"
            target="_blank"
          >
            <div className="blocker" />
            <FramedCubeFace color="#C9E4DE">
              <iframe
                src="https://escapeoverseer.com"
                width="100%"
                height="100%"
              />
            </FramedCubeFace>
          </a>
          <a
            className="cube-face-4 cube-face  linkwrap"
            href="https://spotter.gg"
            target="_blank"
          >
            <FramedCubeFace color="#FAEDCB">
              <img
                src="Spottergglogo1.webp"
                className="cube-image object-cover"
              />
            </FramedCubeFace>
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
