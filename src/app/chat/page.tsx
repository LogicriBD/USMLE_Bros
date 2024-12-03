import ChatSideBar from "@/src/components/Chat/ChatSideBar";
import ChatView from "@/src/components/Chat/chatView";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Chat",
    description: "Chat with your fellow USMLE bros and get your queries solved",
    authors: [{
        name: "USMLE Bros",
        url: "https://usmle-bros.vercel.app/",
    }, {
        name: "RobustTech BD",
        url: "https://robustechbd.com/"
    }],
    icons: [
        {
            href: "/logos/icon.png",
            sizes: "192x192",
            type: "image/png",
            url: "/logos/icon.png",
        },
    ],
    keywords: ["USMLE", "Bros", "Chat", "Chat with USMLE Bros", "USMLE Bros Chat", "USMLE Bros Chat Page", "USMLE Chat", "USMLE Bros Chat with USMLE Bros"]
}

const ChatPage = () =>
{

    return (
        <div className="w-full h-full flex flex-row">
            <div className="lg:w-1/5 w-1/6 max-w-[58px] lg:max-w-full h-full overflow-hidden">
                <ChatSideBar />
            </div>
            <div className="flex-grow lg:w-4/5 w-5/6 h-full flex flex-col">
                <ChatView />
            </div>
        </div>
    );
};

export default ChatPage;
