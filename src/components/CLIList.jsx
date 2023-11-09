import React, { useState, useEffect, useRef } from "react";
import "./CLIList.css";

function CLIList() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCommandText, setCurrentCommandText] = useState("");
  const [completedCommands, setCompletedCommands] = useState([]);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  const projects = [
    {
      title: "Escape Overseer NextJS Port",
      fullDesc:
        "A full port to NextJS of the original Electron App version of EscapeOverseer; A software suite designed for escape room management and control",
    },
    {
      title: "UNHHHH Self Generating Episodes",
      fullDesc:
        "For those that don't know, UNHHHH is a web series hosted by celebrity drag queens Trixie Mattel and Katya Zamo. The show is a simple talk show format where each 15 minute episode focuses around some key topic. My project sets out to generate syntehtic versions of these episodes on whatever topic users enter. Currently, the process generates a script based on the given topic, then breaks the dialogue out for each speaker, sends those dialogues to their respective host agents, who speak the lines with cloned voices of Trixie and Katya. Currently the generated episodes are audio only, but I am experimenting with various tools to create generative video to match the scripts as well.",
    },
    {
      title: "Autogen Blog",
      fullDesc:
        "Using microsoft's new Autogen framework for multi-agent communication, I set up a small AI company to write weekly linkedin blog posts about some tech topic of the AI's choosing. I set the company up with an editor, a writer, a reviewer, and a research assistant. The editor is ultimately responsible for determining the subject of the weekly post, but may request the research assistant to go webscrape for the hottest topics in tech for the past week. The editor then gives that topic to the writer, who is responsible for actually writing the article, but again may request the research assistant to go scrape the web for more info on the specific topic now that it has been narrowed down. Once the writer is finished, the writer will send the article to the reviewer who will proof read and request any edits it thinks are necessary. The writer and reviewer must do a minimum of two rounds of this before submitting the article back to the editor for approval, who then forwards the article to me via an email. If I choose to approve the article, It will be posted to linkedin. If not, I can request specific changes I want, or tell the agents to start over. I ultimately turned off all the automation on this project due to high costs of running several models in unison on a regular basis. The web scraper specifically took up quite a bit of the budget with a wide variance in quality that didn't always warrant the price. The project now sits as a script that can be ran as a one-off. If I decide to return to this project, the key focus would be fine tuning the models to improve their given purposes, especially the web scraper.",
    },
    {
      title: "Othello ThreeJS Game",
      fullDesc: "Simple game of Othello, built in 3D with ThreeJS",
    },
  ];

  const initialPrompt = [
    "Projects In Varying Stages Of Development:",
    ...projects.map((value, index) => `${index}) ${value.title}`),
    "For more information on any of these projects, type 'mi {project#}', or type 'help' for a full list of commands",
  ];

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      const response = processCommand(userInput);
      setCompletedCommands((prev) => [...prev, `>_ ${userInput}`, ...response]);
      setUserInput("");
    }
  };

  const processCommand = (command) => {
    const knownCommands = {
      hello: {
        desc: "Test command, says hello back",
        return: ["Hello, User!"],
      },
      ls: {
        desc: "List projects in development",
        return: initialPrompt,
      },
      mi: {
        desc: "Get more information on a selected project, given an ID",
        return: ["Invalid input. Make sure to pass valid project ID"],
      },
      help: { desc: "List known commands", return: ["List of commands:"] }, // Placeholder, we will populate this below
    };

    // ... add more known commands here
    for (const cmd in knownCommands) {
      knownCommands["help"].return.push(
        `\t\t${cmd}: ${knownCommands[cmd].desc}`
      );
    }

    for (const [index, prj] of projects.entries()) {
      knownCommands[`mi ${index}`] = {
        desc: "Get more information on a selected project, given an ID",
        return: [prj.title, prj.fullDesc],
      };
    }

    return (
      knownCommands[command].return || [
        `Unknown command: ${command}`,
        "Type 'help' for a full list of commands",
      ]
    );
  };

  useEffect(() => {
    if (currentCommandIndex < initialPrompt.length) {
      const currentCommand = initialPrompt[currentCommandIndex];
      if (currentCommandText.length < currentCommand.length) {
        setTimeout(() => {
          setCurrentCommandText((prevText) =>
            currentCommand.substr(0, prevText.length + 1)
          );
        }, 30); // typing speed
      } else {
        setCompletedCommands((prevCommands) => [
          ...prevCommands,
          currentCommand,
        ]);
        setCurrentCommandIndex((prevIndex) => prevIndex + 1);
        setCurrentCommandText("");
      }
    } else {
      // Focus on the input element after all commands have been displayed
      inputRef.current.focus();
    }
  }, [currentCommandText, currentCommandIndex]);

  return (
    <div className="bg-black text-white font-mono p-5 terminal h-screen overflow-y-scroll no-scrollbar">
      {completedCommands.map((command, idx) => (
        <p key={idx} className="mb-2">
          <span className="text-green-500">{">_"}</span> {command}
        </p>
      ))}
      {currentCommandIndex < initialPrompt.length && (
        <p className="mb-2">
          <span className="text-green-500">{">_"}</span> {currentCommandText}
          <span className="cursor bg-green-500 inline-block w-2.5 h-4" />
        </p>
      )}
      {currentCommandIndex >= initialPrompt.length && (
        <div className="flex items-center mb-2">
          <span className="text-green-500 mr-2">{">_"}</span>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleEnterKeyPress}
            className="bg-black text-white focus:outline-none w-full"
          />
        </div>
      )}
    </div>
  );
}

export default CLIList;
