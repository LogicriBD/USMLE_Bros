/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { sendMessage } from "@/actions/chat/sendMessage";
import { Chat } from "@/database/repository/Chat";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { ReceiveMessage, SendMessage } from "@/types/Message";
import { logger } from "@/utils/Logger";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageUI from "./Message";
import LinkMessage from "@/utils/helpers/LinkParser";
import { Roles } from "@/utils/enums/Roles";
import { useInView } from "react-intersection-observer";
import { Spinner } from "react-bootstrap";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Button } from "../CustomStyle/CustomComponents";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { routes } from "@/src/api/Routes";
import { deleteActions } from "@/src/context/store/slices/delete-slice";
const ChatView = () =>
{
    const user = useAppSelector((state) => state.user);
    const isDeleted = useAppSelector((state) => state.deleteMessage.isDeleted);
    const deleteMessageId = useAppSelector((state) => state.deleteMessage.messageId);
    const dispatch = useAppDispatch();

    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<ReceiveMessage[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastVisible, setLastVisible] = useState<null | QueryDocumentSnapshot<DocumentData>>(null);
    const { ref, inView } = useInView();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [previewImage, setPreviewImage] = useState<File | null>(null);
    const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

    const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);

    const handleInputClick = () =>
    {
        if (fileInputRef.current)
        {
            fileInputRef.current.click();
        }
    }

    const handleClearPreview = () =>
    {
        setPreviewImage(null);
        setPreviewImageURL(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleImageUpload = () =>
    {
        if (fileInputRef.current && fileInputRef.current.files)
        {
            const file = fileInputRef.current.files[0];
            if (file)
            {
                try
                {
                    setImageUploadLoading(true);
                    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
                    if (validImageTypes.includes(file.type))
                    {
                        const objectUrl = URL.createObjectURL(file);
                        setPreviewImage(file);
                        setPreviewImageURL(objectUrl);
                    }
                } catch (error: any)
                {
                    logger.log(error);
                } finally
                {
                    setImageUploadLoading(false);
                }
            }
        }
    }

    const uploadImage = async () =>
    {
        const f = new FormData();
        if (previewImage)
        {
            f.append("file", previewImage);
        } else
        {
            return "";
        }

        try
        {
            const response = await fetch(routes.content.upload, {
                method: "POST",
                body: f,
            });
            const data = await response.json();
            logger.log("Image Uploaded:", data.file.url);
            if (fileInputRef.current) fileInputRef.current.value = "";
            return data.file.url as string;
        } catch (error)
        {
            logger.error("Error uploading image:", error);
            return "";
        }
    }

    const handleSendMessage = async () =>
    {
        try
        {
            if (text !== "" || previewImage !== null)
            {
                setLoading(true);

                const messageContent = user.role === Roles.Admin ? LinkMessage(text) : text;
                const message: SendMessage = {
                    text: messageContent,
                    userId: user.id,
                    userName: user.name,
                    time: new Date().toISOString()
                }

                if (previewImage)
                {
                    const imageUrl = await uploadImage();
                    message.imageUrl = imageUrl;
                    setPreviewImage(null);
                    setPreviewImageURL(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }
                const sendAction = new sendMessage({
                    message: message
                });
                await sendAction.execute();
            }
        } catch (error: any)
        {
            logger.error(error);
        } finally
        {
            setLoading(false);
            setText("");
        }
    }

    const fetchOlderMessages = useCallback(async () =>
    {
        logger.log("fetching older messages");

        if (!hasMore) return;
        await Chat.fetchOldMessages((olderMessages: ReceiveMessage[], newLastVisible, hasMore:boolean) =>
        {
            setHasMore(hasMore)
            if (olderMessages.length === 0)
            {
                setHasMore(false);
            } else
            {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    ...olderMessages.filter((msg) => !prevMessages.some((m) => m.id === msg.id)),
                ]);
                setLastVisible(newLastVisible);
            }
        }, lastVisible);
    }, [hasMore, lastVisible]);

    const handleNewMessages = ((newMessages: ReceiveMessage[]) =>
    {
        setMessages((prevMessages) => [
            ...newMessages.filter((msg) => !prevMessages.some((m) => m.id === msg.id)),
            ...prevMessages,
        ]);
    });

    useEffect(() =>
    {
        const unsubscribe = Chat.fetchNewMessages((newMessages: ReceiveMessage[], newLastVisible) =>
        {
            logger.log("fetching new messages");
            handleNewMessages(newMessages);
            setLastVisible(newLastVisible);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() =>
    {
        if (inView && hasMore)
        {
            fetchOlderMessages();
        }
    }, [inView, hasMore]);

    useEffect(() =>
    {
        if (isDeleted && deleteMessageId !== "")
        {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== deleteMessageId));
            dispatch(deleteActions.resetDelete());
        }
    }, [isDeleted]);

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
                    <div className="md:flex hidden flex-col items-center space-x-1 border-t border-gray-500 p-2 bg-inherit">
                        {previewImage && (
                            <div className="w-full px-3 py-2rounded-lg flex flex-row justify-start items-center z-20">
                                {(imageUploadLoading || !previewImageURL) ? (
                                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center">
                                        <Spinner animation="border" variant="primary" size="sm" />
                                    </div>
                                ) : (
                                    <div className="relative max-w-xs max-h-xs flex p-0 ">
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            className="absolute top-0 right-0 text-white bg-black text-lg cursor-pointer rounded-full border-2 border-gray-800"
                                            onClick={handleClearPreview}
                                        />
                                        <Image
                                            src={previewImageURL}
                                            alt="Preview"
                                            className="object-cover rounded-md"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex flex-row space-x-1 w-full items-center p-3">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) =>
                                {
                                    if (e.key === "Enter")
                                    {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Type a message..."
                                className="flex-grow p-2 border rounded-md"
                            />
                            {user.role === Roles.Admin && (
                                <Button variant="secondary" title='Image' size="default" onClick={handleInputClick}>
                                    <ImageIcon className="h-4 w-4 text-white" />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            )}
                            <button
                                onClick={handleSendMessage}
                                disabled={loading}
                                className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>

                    {/* mobile version */}
                    <div className="flex md:hidden flex-col items-center space-x-1 border-t border-gray-600 bg-inherit">
                        {previewImage && (
                            <div className="w-full px-3 py-2rounded-lg flex flex-row justify-start items-center z-20">
                                {(imageUploadLoading || !previewImageURL) ? (
                                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center">
                                        <Spinner animation="border" variant="primary" size="sm" />
                                    </div>
                                ) : (
                                    <div className="relative max-w-xs max-h-xs flex p-0 ">
                                        <FontAwesomeIcon
                                            icon={faTimesCircle}
                                            className="absolute top-0 right-0 text-white bg-black text-lg cursor-pointer rounded-full border-2 border-gray-800"
                                            onClick={handleClearPreview}
                                        />
                                        <Image
                                            src={previewImageURL}
                                            alt="Preview"
                                            className="object-cover rounded-md"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="w-full flex flex-row items-center space-x-1 p-2">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow p-2 border rounded-full"
                            />
                            {user.role === Roles.Admin && (
                                <Button variant="secondary" title='Image' size="sm" onClick={handleInputClick}>
                                    <ImageIcon className="h-4 w-4 text-white" />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            )}
                            <button
                                onClick={handleSendMessage}
                                disabled={loading}
                                className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold md:text-md text-sm rounded-md px-2 py-2 transition duration-300"
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default ChatView;
