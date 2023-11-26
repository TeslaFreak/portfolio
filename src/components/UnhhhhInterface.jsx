import React, { useState } from "react";
import LoadingOverlay from "./UnhhhhLoadingOverlay";

const UnhhhhInterface = () => {
  const [messages, setMessages] = useState([]);

  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [jobId, setJobId] = useState("");

  const episodeEndpoint =
    "https://66j5f8jkuc.execute-api.us-east-1.amazonaws.com/staging/episode";
  const createEpisodeJob = async () => {
    try {
      const response = await fetch(episodeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      pollEpisodeStatus(data.executionArn);
    } catch (error) {
      setStatus(error);
      console.error("Error calling first endpoint:", error);
    }
  };

  const pollEpisodeStatus = async (arn) => {
    try {
      const response = await fetch(
        episodeEndpoint + `/${encodeURIComponent(arn)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.message) {
        setStatus(data.message);
        return;
      }
      setStatus(data.status);
      if (data.status && data.status === "SUCCEEDED") {
        setJobId(data.job_id);
        setMessages(data.script_array);
        playAudioList(0, data.presignedUrls);
      } else {
        setTimeout(() => pollEpisodeStatus(arn), 7000); // Poll every 7 seconds
      }
    } catch (error) {
      setStatus(error);
      console.error("Error polling second endpoint:", error);
    }
  };

  const playAudioList = (index = 0, audioList) => {
    if (index < audioList.length) {
      var audio = new Audio(audioList[index]);
      audio.addEventListener(
        "loadedmetadata",
        function () {
          audio.play();
          setTimeout(
            () => playAudioList(index + 1, audioList),
            audio.duration * 1000
          ); // Wait the length of the track before playing the next
        },
        false
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEpisodeJob();

    // if (message.trim() !== "") {
    //   // Toggle the speaker for each message to differentiate between the two
    //   const speaker = messages.length % 2 === 0 ? "left" : "right";
    //   setMessages([...messages, { text: message, speaker }]);
    //   setMessage("");
    // }
  };

  return (
    <div className="h-full bg-gray-100 min-h-screen">
      {/* Sticky input & button */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
      {!["IDLE", "SUCCEEDED"].includes(status) && (
        <LoadingOverlay status={status} />
      )}
      {/* Chat interface */}
      <div className="p-4 mt-16 max-w-lg mx-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-3 rounded-md max-w-xs ${
              msg.speaker.toLowerCase() === "trixie"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800 ml-auto"
            }`}
          >
            {msg.line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnhhhhInterface;
