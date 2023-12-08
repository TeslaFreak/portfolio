import React, { useState, useEffect } from "react";

const LoadingOverlay = ({ status }) => {
  const [funnyLine, setFunnyLine] = useState("");
  const funnyLines = [
    "Yaaasifying script",
    "Preparing death drops",
    "Adjusting the crown",
    "Serving looks",
    "Lip-syncing for the gods",
    "Boots the house down",
    "Werqing",
    // Add more lines as desired
  ];

  useEffect(() => {
    const changeLine = () => {
      const randomIndex = Math.floor(Math.random() * funnyLines.length);
      setFunnyLine(funnyLines[randomIndex]);
    };

    const intervalId = setInterval(changeLine, 3000); // Change line every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="text-white text-xl mb-2">STATUS: {status}</div>
        <div className="text-white text-xl mb-2">
          This may take a few minutes. Please do not leave or refresh the page.
        </div>
        <div className="text-white text-4xl mb-4 pt-12 ">{funnyLine}</div>
        {/* Spinner */}
        <div className="w-16 h-16 animate-spin">
          <img src="trixieLoaderMedium.png" alt="loader img" />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
