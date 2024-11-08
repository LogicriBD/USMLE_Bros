"use client";

import { useAppSelector } from "@/src/context/store/hooks";

const ChatView = () => {
    const role = useAppSelector((state) => state.user.role);
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
                        className="w-full p-2 rounded-md bg-white"
                        placeholder="Type a message..."
                    />
                    <button className="ml-2 mr-1 my-2 text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChatView;
