import React, { useState, useEffect } from "react";

const ErrorOverlay = ({ status }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 flex justify-center items-center z-20">
      <div className="flex flex-col items-center">
        <div className="text-white text-xl mb-2">STATUS: {status}</div>
        <div className="text-white text-xl m-8 text-center">
          {status === "ERROR: Episode does not exist"
            ? "Sorry, It looks like the episode youre trying to access doesn't exist. Try entering a new topic."
            : status === "FAILED"
            ? "We're terribly sorry. It looks like something didn't work correctly on our end. Give your request another try. If the problem persists, please contact the maintainer."
            : "We're terribly sorry. It looks like something has broken on our end. We hope to have the problem fixed soon. Please check back later."}
        </div>
      </div>
    </div>
  );
};

export default ErrorOverlay;
