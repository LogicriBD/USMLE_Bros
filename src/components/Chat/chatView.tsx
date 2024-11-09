"use client";

import { sendMessage } from "@/actions/chat/sendMessage";
import { useAppSelector } from "@/src/context/store/hooks";
import { logger } from "@/utils/Logger";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const ChatView = () => {
    const user = useAppSelector((state) => state.user);

    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendMessage = async() => {
        try{
            setLoading(true);
            const sendAction = new sendMessage({
                message: {
                    text: text,
                    userId: user.id,
                    userName: user.name,
                    time: new Date().toISOString()
                }
            });
            await sendAction.execute();
        }catch(error:any){
            logger.error(error);
        }finally{
            setLoading(false);
            setText("");
        }
    }

    return (
        <div className="flex flex-col  w-full h-full">
            <div className="w-full p-2 flex justify-center items-center text-cyan-300 md:text-4xl text-2xl font-bold">
                Chat
            </div>

            <div className="w-full flex-grow bg-opacity-10 bg-gray-500 rounded-lg">
                <div className="h-5/6 text-md font-semibold overflow-y-auto"></div>
                <div className="h-1/6 w-full p-3 bg-marrow-dark flex flex-row items-center rounded-b-lg">
                    <input 
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 rounded-md bg-white"
                        placeholder="Type a message..."
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={loading}
                        className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                    >
                        {loading ? <Spinner animation="border" variant="light" size="sm" /> : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChatView;
