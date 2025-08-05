"use client"
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { sendToGemini } from "@/app/api/Ai/GeminiRes";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";


const placeholders = [
    "Suggest a graduation project idea for computer science students.",
    "How can I build a smart attendance system using facial recognition?",
    "Give me a machine learning project related to healthcare.",
    "Generate a web-based system for university student tracking.",
    "Create a mobile app project idea that helps students manage their study schedule.",
];

interface Message {
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

    function canSendRequest() {
        const limit = 2;
        const now = Date.now();

        let data = JSON.parse(
            localStorage.getItem("request_data") || "null"
        ) || {
            count: 0,
            dayStart: now,
        };

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayStartTimestamp = todayStart.getTime();

        if (data.dayStart < todayStartTimestamp) {
            data = {
                count: 0,
                dayStart: todayStartTimestamp,
            };
        }

        if (data.count >= limit) {
            return false;
        }
        data.count += 1;
        localStorage.setItem("request_data", JSON.stringify(data));
        return true;
    }

export default function DashboardAi() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        // check if the user has reached the daily limit
        if (!canSendRequest()) {
            alert(" You have reached the daily limit for AI requests.");
            return;
        }
        // user message
        const userMessage: Message = {
            text: trimmed,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            // get AI res
            const aiResponse = await sendToGemini(trimmed);

            const aiMessage: Message = {
                text:
                    aiResponse ||
                    "Sorry, I couldn't generate a response. Please try again.",
                sender: "ai",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error getting response from Gemini:", error);
            const errorMessage: Message = {
                text: "Sorry, I couldn't process your request. Please try again.",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // before submission
    if (messages.length === 0) {
        return (
            <div className="bg-[#0e0e0e] p-4 w-full h-full flex flex-col items-center justify-center">
                <div className="h-[40rem] flex flex-col justify-center items-center px-4">
                    <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">
                        Ask{" "}
                        <span className="text-green-500 font-semibold">
                            Gradly
                        </span>{" "}
                        <span className="text-[#00FFF0] font-semibold">AI</span>{" "}
                        for Project Ideas
                    </h2>

                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        );
    }

    // after submission
    return (
        <div className="bg-[#0e0e0e] p-4 w-full h-full flex flex-col justify-between text-white">
            <div
                className="flex flex-col gap-4 mb-6 px-4 md:px-20 overflow-y-auto"
                style={{ flexGrow: 1 }}
            >
                {messages.map((message, i) => (
                    <div key={i} className="flex flex-col">
                        {message.sender === "user" ? (
                            <div className="self-end max-w-[90%] md:max-w-[80%]">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 px-4 rounded-2xl rounded-br-none shadow-md border">
                                    {message.text}
                                </div>
                                <div className="text-xs text-gray-500 text-right mt-1 pr-1">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <div className="self-start max-w-[90%] md:max-w-[80%] mt-2">
                                <div className="flex items-start gap-2">
                                    <div className="bg-indigo-100 p-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-violet-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                            />
                                        </svg>
                                    </div>
                                    <div className="bg-white border border-gray-200 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm">
                                        <div className="font-medium text-indigo-600 mb-1">
                                            Gradly AI
                                        </div>
                                        <div className="text-black whitespace-pre-wrap">
                                            <ReactMarkdown>{message.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 pl-10">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="self-start max-w-[80%] mt-2">
                        <div className="flex items-start gap-2">
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-violet-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                            </div>
                            <div className="bg-white border border-gray-200 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm">
                                <div className="font-medium text-indigo-600 mb-1">
                                    Gradly AI
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}
