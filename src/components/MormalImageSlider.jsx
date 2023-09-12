import React, { useState, useRef } from "react";

function ImageSlider() {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [mouseCurrentX, setMouseCurrentX] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const track = useRef(null);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX);
  };

  const handleOnUp = (e) => {
    setMouseDownAt(0);
  };

  const handleOnMove = (e) => {
    setMouseCurrentX(e.clientX);
  };

  React.useEffect(() => {
    if (mouseDownAt === 0) {
      setPrevPercentage(percentage);
      return;
    }
    const mouseDelta = mouseDownAt - mouseCurrentX;
    //const maxDelta = track.current.offsetWidth;
    const maxDelta = window.innerWidth;

    const tpercentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = prevPercentage + tpercentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    setPercentage(nextPercentage);

    track.current.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    [...track.current.children].map((image) => {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    });
  }, [mouseCurrentX]);

  React.useEffect(() => {
    track.current.addEventListener("mousedown", handleOnDown);
    track.current.addEventListener("touchstart", (e) =>
      handleOnDown(e.touches[0])
    );
    track.current.addEventListener("mouseup", handleOnUp);
    track.current.addEventListener("mouseleave", handleOnUp);
    track.current.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));

    track.current.addEventListener("mousemove", handleOnMove);
    track.current.addEventListener("touchmove", (e) =>
      handleOnMove(e.touches[0])
    );

    // Clean up the event listeners when the component unmounts
    return () => {
      track.current.removeEventListener("mousedown", handleOnDown);
      track.current.removeEventListener("touchstart", (e) =>
        handleOnDown(e.touches[0])
      );
      track.current.removeEventListener("mouseup", handleOnUp);
      track.current.removeEventListener("touchend", (e) =>
        handleOnUp(e.touches[0])
      );
      track.current.removeEventListener("mousemove", handleOnMove);
      track.current.removeEventListener("touchmove", (e) =>
        handleOnMove(e.touches[0])
      );
    };
  }, []);

  return (
    <div
      id="image-track"
      className="w-full flex gap-[4vmin] absolute left-1/2 top-1/2  translate-y-[-50%]"
      ref={track}
      data-mouse-down-at={mouseDownAt}
      data-prev-percentage={prevPercentage}
    >
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1621814684469-9fd78033d7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw2NDY1NjN8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGxhbmRzY2FwZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxhbmRzY2FwZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhbmRzY2FwZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1621814684469-9fd78033d7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw2NDY1NjN8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
      <img
        className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
        draggable="false"
        src="https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGxhbmRzY2FwZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
    </div>
  );
}

export default ImageSlider;
