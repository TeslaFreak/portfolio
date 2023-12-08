import React, { useState, useRef, useEffect } from "react";
import LoadingOverlay from "./UnhhhhLoadingOverlay";
import { MdAutorenew, MdCancel, MdShare } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConsentOverlay from "./UnhhhhConsentOverlay";
import ErrorOverlay from "./UnhhhhErrorOverlay";

const UnhhhhInterface = () => {
  const [messages, setMessages] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [hasConsent, setHasConsent] = useState(undefined);
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("IDLE");
  const autoPlayRef = useRef(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const currentlyPlayingAudio = useRef(null);

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    if (params.has("episode")) {
      pollEpisodeStatus(params.get("episode"));
    }
  }, []);

  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    if (hasConsent && autoPlay && currentlyPlayingAudio.current === null) {
      playAudioList(0);
    }
  }, [audioList, hasConsent, autoPlay]);

  const episodeEndpoint =
    "https://66j5f8jkuc.execute-api.us-east-1.amazonaws.com/staging/episode";
  const createEpisodeJob = async () => {
    setAudioList([]);
    setMessages([]);
    try {
      const response = await fetch(episodeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setStatus("QUEUED");
      pollEpisodeStatus(data.episodeId);
    } catch (error) {
      setStatus(error);
      console.error("Error calling first endpoint:", error);
    }
  };

  const pollEpisodeStatus = async (episodeId) => {
    try {
      const response = await fetch(
        episodeEndpoint + `/${encodeURIComponent(episodeId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status == 500) {
        setStatus("ERROR: Episode does not exist");
        return;
      }
      if (data.message) {
        setStatus(data.message);
        return;
      }
      setStatus(data.status);
      if (data.status && data.status === "FAILED") {
        setStatus(data.status);
        setAudioList([]);
        return;
      }
      if (data.status && data.status === "SUCCEEDED") {
        setMessages(data.script_array);
        setAudioList(data.presignedUrls);
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("episode", data.job_id);
        let newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString();
        history.pushState(null, "", newRelativePathQuery);
        if (data.presignedUrls.length === 0) {
          toast.error(
            "We're terribly sorry, it looks like the maintainer of this project may have hit their monetary limit for the month. Each episode costs a bit of money to produce, and a monthly limit is in place to prevent this system from emptying their bank account. Please check back after the 12th of the next month when the limit resets and try again!",
            {
              position: "bottom-right",
              autoClose: 10000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      } else {
        setTimeout(() => pollEpisodeStatus(episodeId), 7000); // Poll every 7 seconds
      }
    } catch (error) {
      setStatus(error);
      console.error("Error polling second endpoint:", error);
    }
  };

  const playAudioList = (index = 0) => {
    if (!import.meta.env.PROD) console.log(`index ${index} called`);
    clearTimeouts();
    if (index < audioList.length) {
      if (currentlyPlayingAudio.current !== null) {
        try {
          currentlyPlayingAudio.current.pause();
        } catch {
          console.log(
            "tried to pause audio, but there is no audio currently playing"
          );
        }
      }
      let audio = new Audio(audioList[index]);
      currentlyPlayingAudio.current = audio;
      audio.addEventListener(
        "loadedmetadata",
        function () {
          if (!import.meta.env.PROD) console.log(`index ${index} playing`);
          audio.play();
          if (!!autoPlayRef.current) {
            setTimeout(() => {
              if (!!autoPlayRef.current) {
                playAudioList(index + 1);
              }
            }, audio.duration * 1000); // Wait the length of the track before playing the next
          }
        },
        false
      );
    }
  };

  const clearTimeouts = () => {
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.pushState(null, "", window.location.pathname);
    createEpisodeJob();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("📋 Link copied to clipboard", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="h-full bg-gray-100 min-h-screen">
      {/* Sticky input & button */}
      <div className="sticky top-0 z-50 bg-white p-4 shadow-md">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter the episode topic..."
            className={`flex-grow p-2 border rounded-md ${
              ["QUEUED", "RUNNING"].includes(status)
                ? "bg-gray-200 cursor-not-allowed"
                : ""
            }`}
            disabled={["QUEUED", "RUNNING"].includes(status)}
          />
          <button
            className={`ml-2 px-4 py-2 text-white rounded-md ${
              ["QUEUED", "RUNNING"].includes(status)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
            type="submit"
            disabled={["QUEUED", "RUNNING"].includes(status)}
          >
            Submit
          </button>
          <button
            className={`ml-2 px-4 py-2 text-white rounded-md flex items-center ${
              ["IDLE", "QUEUED", "RUNNING"].includes(status)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500"
            }`}
            onClick={handleShare}
            type="button"
            disabled={["IDLE", "QUEUED", "RUNNING"].includes(status)}
          >
            <MdShare className="mr-2" />
            Share
          </button>
        </form>
        <div className="fixed bottom-4 right-4">
          <button
            className={`flex items-center px-4 py-2 text-white rounded-md ${
              autoPlay ? "bg-purple-500" : "bg-gray-500"
            }`}
            onClick={() => setAutoPlay(!autoPlay)}
          >
            {autoPlay ? (
              <MdAutorenew className="mr-2" />
            ) : (
              <MdCancel className="mr-2" />
            )}
            AutoPlay
          </button>
        </div>
        <div className="fixed bottom-4 left-4">
          <a href="https://www.buymeacoffee.com/chrisallmon" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: "40px", width: "144px" }}
            />
          </a>
        </div>
      </div>
      {!["IDLE", "SUCCEEDED"].includes(status) && (
        <LoadingOverlay status={status} />
      )}
      {!["IDLE", "SUCCEEDED", "QUEUED", "RUNNING"].includes(status) && (
        <ErrorOverlay status={status} />
      )}
      {["IDLE", "SUCCEEDED"].includes(status) && hasConsent === undefined && (
        <ConsentOverlay
          setHasConsent={setHasConsent}
          setAutoPlay={setAutoPlay}
        />
      )}
      <ToastContainer />
      {/* Chat interface */}
      <div className="p-4 mt-16 max-w-lg mx-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-3 rounded-md max-w-xs transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              msg.speaker.toLowerCase() === "trixie"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800 ml-auto"
            }`}
            onClick={() => playAudioList(idx)}
          >
            {msg.line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnhhhhInterface;
