import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import BACKEND_URL from "../api/url";

const AIAssistant = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.trim() || loading) return;

        const userMessage = input;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage
            }
        ]);

        setInput("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${BACKEND_URL}/api/ai/test`,
                {
                    text: userMessage
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: response.data
                }
            ]);

        } catch (error) {
            console.error("AI Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content:
                        "Sorry, something went wrong. Please try again."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                fixed
                bottom-20
                left-3
                right-3
                z-[9998]
                sm:left-auto
                sm:right-6
                sm:bottom-24
                sm:w-[380px]
            "
        >

            <div
                className="
                    flex
                    h-[70vh]
                    max-h-[550px]
                    min-h-[400px]
                    w-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-2xl
                "
            >

                {/* Header */}
                <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-600 px-4 py-4 sm:px-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg sm:h-10 sm:w-10">
                            🤖
                        </div>

                        <div>
                            <h2 className="font-semibold text-white text-sm sm:text-base">
                                AI Task Assistant
                            </h2>

                            <div className="mt-0.5 flex items-center gap-1.5">

                                <span className="h-2 w-2 rounded-full bg-emerald-200"></span>

                                <span className="text-xs text-emerald-50">
                                    AI Assistant
                                </span>

                            </div>
                        </div>

                    </div>

                </div>


                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-3 sm:space-y-5 sm:p-4">

                    {/* Initial AI message */}
                    <div className="flex items-start gap-2.5">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                            AI
                        </div>

                        <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">

                            <p className="text-sm leading-5 text-gray-700">
                                Hi! I'm your AI task assistant. Ask me
                                anything about your tasks.
                            </p>

                        </div>

                    </div>


                    {/* Dynamic messages */}
                    {messages.map((message, index) => (

                        message.role === "user" ? (

                            <div
                                key={index}
                                className="flex justify-end"
                            >

                                <div className="max-w-[82%] break-words rounded-2xl rounded-tr-sm bg-emerald-600 px-3.5 py-3 text-white shadow-sm">

                                    <p className="text-sm leading-5 break-words">
                                        {message.content}
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div
                                key={index}
                                className="flex items-start gap-2.5"
                            >

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                                    AI
                                </div>

                                <div className="max-w-[82%] min-w-0 overflow-hidden rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">

                                    <div className="prose prose-sm max-w-none break-words text-gray-700">
                                        <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>

                                </div>

                            </div>

                        )

                    ))}


                    {/* Loading */}
                    {loading && (

                        <div className="flex items-start gap-2.5">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                                AI
                            </div>

                            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-4 shadow-sm">

                                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500"></span>

                                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:150ms]"></span>

                                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:300ms]"></span>

                            </div>

                        </div>

                    )}

                </div>


                {/* Input */}
                <div className="border-t border-gray-200 bg-white p-2.5 sm:p-3">

                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }}
                            type="text"
                            placeholder="Ask about your tasks..."
                            disabled={loading}
                            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
                        >
                            {loading ? "..." : "Send"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AIAssistant;