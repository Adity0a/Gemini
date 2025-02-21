import React, { createContext, useState } from "react";

// FIX: Ensure correct path to `gemini.js` (check if it exists in `config/`)
import geminiConfig from "../config/gemini"; // Adjust if necessary

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = () => {
    if (input.trim() === "") return;
    setRecentPrompt(input);
    setShowResult(true);
    setLoading(true);

    // Simulating API response (Replace this with actual Gemini API call)
    setTimeout(() => {
      setResultData(`<strong>Response for:</strong> ${input}`);
      setLoading(false);
    }, 2000);

    setInput("");
  };

  return (
    <Context.Provider value={{ onSent, recentPrompt, showResult, loading, resultData, setInput, input }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
