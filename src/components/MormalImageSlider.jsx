import React, { useState, useRef } from "react";

function ImageSlider() {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [mouseCurrentX, setMouseCurrentX] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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
    const maxDelta = track.current.scrollWidth;
    // const maxDelta = window.innerWidth;

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
      image.children[0].animate(
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

  const pointer = useRef({ x: 0, y: 0 });

  const imageMouseDown = (e) => {
    setIsDragging(true);
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const imageMouseUp = (e) => {
    const { x, y } = pointer.current;
    if (Math.abs(e.clientX - x) < 10 && Math.abs(e.clientY - y) < 10) {
      setIsDragging(false);
    } else {
      setTimeout(() => {
        setIsDragging(false);
      }, 250);
    }
  };

  return (
    <div
      id="image-track"
      className="w-max flex gap-[4vmin] absolute left-1/2 top-1/2  translate-y-[-50%] select-none"
      ref={track}
      data-mouse-down-at={mouseDownAt}
      data-prev-percentage={prevPercentage}
      onMouseDown={imageMouseDown}
      onMouseUp={imageMouseUp}
    >
      <a
        href="/clients/solv"
        onClick={(event) => (isDragging ? event.preventDefault() : null)}
        draggable="false"
        className=" select-none"
      >
        <img
          transition:name="solv-img"
          className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
          draggable="false"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        />
      </a>
      <a
        href="/clients/lobby"
        onClick={(event) => (isDragging ? event.preventDefault() : null)}
        draggable="false"
        className=" select-none"
      >
        <img
          transition:name="lobby-img"
          className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
          draggable="false"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        />
      </a>
      <a
        href="/clients/simplifyy"
        onClick={(event) => (isDragging ? event.preventDefault() : null)}
        draggable="false"
        className=" select-none"
      >
        <img
          transition:name="simplifyy-img"
          className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
          draggable="false"
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80"
        />
      </a>
      <a
        href="/clients/civicplus"
        onClick={(event) => (isDragging ? event.preventDefault() : null)}
        draggable="false"
        className=" select-none"
      >
        <img
          transition:name="civic-img"
          className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
          draggable="false"
          src="https://images.unsplash.com/photo-1548946061-4af3de8b577c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2503&q=80"
        />
      </a>
      <a
        href="/clients/ge"
        onClick={(event) => (isDragging ? event.preventDefault() : null)}
        draggable="false"
        className=" select-none"
      >
        <img
          transition:name="ge-img"
          className="slide-image w-[40vmin] h-[56vmin] object-cover object-right select-none"
          draggable="false"
          src="https://images.unsplash.com/photo-1503379230423-19c53f7e9a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80"
        />
      </a>
    </div>
  );
}

export default ImageSlider;
