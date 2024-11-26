import { TopicType } from "@/database/repository/Topic"

type Props = {
    topic:TopicType
}
const TopicCardBody = (props:Props) => {
    return (
        <div className="w-full p-3 flex flex-col space-y-2 bg-gray-200 ">
            <div className="w-full  flex-row flex justify-between items-center">
                <div className="text-marrow-dark text-md px-2 flex flex-col">
                    {props.topic.title}
                    <span className="text-sm">{props.topic.description}</span>
                </div>
                <div className="flex flex-row space-x-2 items-center justify-center">
                    <div className="text-black flex flex-col space-y-1 items-center justify-center">
                        <div className="text-xl">0</div>
                        <div className="text-sm">Threads</div>
                    </div>
                    <div className="text-black flex flex-col space-y-1 items-center justify-center">
                        <div className="text-xl">0</div>
                        <div className="text-sm">Messages</div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default TopicCardBody;