"use client";

import { sendMessage } from "@/actions/chat/sendMessage";
import { Chat } from "@/database/repository/Chat";
import { useAppSelector } from "@/src/context/store/hooks";
import { ReceiveMessage } from "@/types/Message";
import { logger } from "@/utils/Logger";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageUI from "./Message";
import LinkMessage from "@/utils/helpers/LinkParser";
import { Roles } from "@/utils/enums/Roles";
import { useInView } from "react-intersection-observer";
import { Spinner } from "react-bootstrap";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
const ChatView = () => {
    const user = useAppSelector((state) => state.user);

    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<ReceiveMessage[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastVisible, setLastVisible] = useState<null | QueryDocumentSnapshot<DocumentData>>(null);
    const { ref, inView } = useInView();

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

    const fetchOlderMessages = useCallback(() => {
        console.log("fetching older messages");

        if (!hasMore) return;
        Chat.fetchOldMessages((olderMessages: ReceiveMessage[], newLastVisible) => {
            if (olderMessages.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    ...olderMessages.filter((msg) => !prevMessages.some((m) => m.id === msg.id)),
                ]);
                setLastVisible(newLastVisible);
            }
        }, lastVisible);
    }, [hasMore, lastVisible]);

    const handleNewMessages = ((newMessages: ReceiveMessage[]) => {
        setMessages((prevMessages) => [
            ...newMessages.filter((msg) => !prevMessages.some((m) => m.id === msg.id)),
            ...prevMessages,
        ]); 
    });

    useEffect(() => {
        const unsubscribe = Chat.fetchNewMessages((newMessages: ReceiveMessage[], newLastVisible) => {
            console.log("fetching new messages");
            handleNewMessages(newMessages);
            setLastVisible(newLastVisible);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (inView && hasMore) {
            fetchOlderMessages();
        }
    }, [inView, hasMore, fetchOlderMessages]); 

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
                    <div
                        className="flex-grow flex-col-reverse flex overflow-y-auto scrollbar-thin px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg">

                        {messages.map((message, index) => (
                            <MessageUI key={index} message={message} user={user} />
                        ))}

                        {hasMore && (
                            <div ref={ref} className="flex justify-center items-cente font-bold">
                                <Spinner animation="border" variant="primary" size="sm" />
                            </div>
                        )}

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
