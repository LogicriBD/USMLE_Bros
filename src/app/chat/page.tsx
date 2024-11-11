import ChatSideBar from "@/src/components/Chat/ChatSideBar";
import ChatView from "@/src/components/Chat/chatView";

const ChatPage = () => {

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
