import React from "react";
import { MdArrowDownward } from "react-icons/md";

const ConsentOverlay = ({ setHasConsent, setAutoPlay }) => {
  const handleConsent = () => {
    setHasConsent(true);
    setAutoPlay(true);
  };

  const handleDeny = () => {
    setHasConsent(false);
    setAutoPlay(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="flex flex-col items-center p-4 bg-gray-800 w-full">
        <div className="text-white text-xl mb-4 text-center">
          This site contains automated audio playback. We would love your
          consent before we play anything for you. Alternatively, just click any
          text bubble to play them individually!
        </div>
        <div>
          <button
            onClick={handleConsent}
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
          >
            Start Playing!
          </button>
          <button
            onClick={handleDeny}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Let Me Play Them At My Own Pace.
          </button>
        </div>
      </div>
      {/* Separate text blurb block */}
      <div className="absolute bottom-16 right-4 p-4 bg-gray-800 rounded-md w-80 items-end flex flex-col">
        <div className="text-white text-sm text-center">
          If you dont want to start playing now, you can always turn AutoPlay
          back on at any time to listen to the full conversation from any point
          you choose.
        </div>

        <MdArrowDownward className="text-white text-4xl animate-bounce" />
      </div>
    </div>
  );
};

export default ConsentOverlay;
