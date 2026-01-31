import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-between flex-1 m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl text-center text-gray-400 sm:text-6xl dark:text-white">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mx-auto mb-3 text-sm ">
          <p className="text-xs">Publish generated image to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Prompt input box */}
      <form
        onSubmit={onSubmit}
        className="
          w-full max-w-2xl mx-auto p-3 pl-4 flex gap-4 items-center
          rounded-full border
          bg-primary/20 dark:bg-[#583c79]/30
          border-primary dark:border-[#80609F]/30
        "
      >
        {/* MODE SELECT */}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="
    pl-3 pr-7 text-sm rounded-full outline-none
    bg-white text-gray-800 border border-gray-300
    dark:bg-[#2f2240] dark:text-white dark:border-[#80609f]/40
    focus:ring-2 focus:ring-primary/40
  "
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {/* PROMPT INPUT */}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your prompt here..."
          required
          className="flex-1 w-full text-sm text-gray-800 bg-transparent outline-none dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300 caret-purple-600 dark:caret-primary"
        />

        {/* SEND BUTTON */}
        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-8 invert dark:invert-0 opacity-90 hover:opacity-100"
            alt="Send"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
