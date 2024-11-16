"use client";

import { sendMessage } from "@/actions/chat/sendMessage";
import { Chat } from "@/database/repository/Chat";
import { useAppSelector } from "@/src/context/store/hooks";
import { ReceiveMessage } from "@/types/Message";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";
import MessageUI from "./Message";
import LinkMessage from "@/utils/helpers/LinkParser";
import { Roles } from "@/utils/enums/Roles";

const ChatView = () => {
    const user = useAppSelector((state) => state.user);

    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<ReceiveMessage[]>([]);

    const handleSendMessage = async () => {
        try {
            if (text !== "") {
                setLoading(true);

                const messageContent = user.role === Roles.Admin ? LinkMessage(text) : text;

                const sendAction = new sendMessage({
                    message: {
                        text: messageContent,
                        userId: user.id,
                        userName: user.name,
                        time: new Date().toISOString()
                    }
                });
                await sendAction.execute();
            }
        } catch (error: any) {
            logger.error(error);
        } finally {
            setLoading(false);
            setText("");
        }
    }

    useEffect(() => {
        const unsubscribe = Chat.fetchMessages(setMessages);
        return () => unsubscribe();
    }, [])

    return (
        <div className="flex flex-col w-full h-full max-h-full">
            {user.banExpiry && user.banExpiry.toDate() > new Date() ? (
                <>
                    <div className="flex-grow flex items-center justify-center text-red-500 font-bold text-2xl">
                        You are banned from the chat
                        
                            {user.banExpiry.toDate() > new Date() && (new Date().getTime() - user.banExpiry.toDate().getTime() >= 24 * 60 * 60 * 1000)
                                ? null
                                : " for less than 24 hours"}
                    
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-grow flex flex-col-reverse overflow-y-auto scrollbar-thin px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg">
                        {messages.map((message, index) => (
                            <MessageUI key={index} message={message} user={user} />
                        ))}
                    </div>

                    {/* desktop version */}
                    <div className="md:flex hidden items-center p-4 border-t bg-marrow-dark">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-grow p-2 border rounded-md"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading}
                            className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>

                    {/* mobile version */}
                    <div className="flex md:hidden items-center p-2 border-t bg-marrow-dark">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow p-2 border rounded-full"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading}
                            className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold md:text-md text-sm rounded-md px-2 py-2 transition duration-300"
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default ChatView;
