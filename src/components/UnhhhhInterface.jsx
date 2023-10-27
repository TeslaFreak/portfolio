import React, { useState } from "react";

const UnhhhhInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Toggle the speaker for each message to differentiate between the two
      const speaker = messages.length % 2 === 0 ? "left" : "right";
      setMessages([...messages, { text: message, speaker }]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Sticky input & button */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter the episode topic..."
            className="flex-grow p-2 border rounded-md"
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Chat interface */}
      <div className="p-4 mt-16 max-w-lg mx-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-3 rounded-md max-w-xs ${
              msg.speaker === "left"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800 ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnhhhhInterface;
