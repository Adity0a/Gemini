import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [recentPrompt, setRecentPrompt] = useState("");

    const onSent = () => {
        setShowResult(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResultData("This is a sample response.");
        }, 2000);
    };

    return (
        <Context.Provider value={{ onSent, recentPrompt, showResult, loading, resultData, setInput, input }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
