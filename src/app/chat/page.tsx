import ChatSideBar from "@/src/components/Chat/ChatSideBar";
import ChatView from "@/src/components/Chat/chatView";

const ChatPage = () => {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-grow flex flex-row w-full">
                <div className="md:w-1/5 w-1/6 h-full">
                    <ChatSideBar />
                </div>
                <div className="md:w-full w-5/6 md:min-h-full h-[94%] flex flex-col py-2 ">
                    <ChatView />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
