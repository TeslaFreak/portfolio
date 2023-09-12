import { useEffect } from "react";

export const BackgroundFadeTrigger = ({ parentClassName }) => {
  useEffect(() => {
    const bg = document.querySelector("html");
    const triggerElement = document.querySelector(`.${parentClassName}`);
    window.addEventListener(
      "scroll",
      () => {
        bg.style.setProperty(
          "--scroll-bg-color",
          Math.min(
            triggerElement.getBoundingClientRect().top /
              triggerElement.offsetHeight,
            1
          )
        );
      },
      false
    );
  }, []);

  return null;
};
