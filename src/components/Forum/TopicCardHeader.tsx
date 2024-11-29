import { TopicType } from "@/database/repository/Topic";

type Props = {
    topic:TopicType
}
const TopicCardHeader = (props:Props) => {
    return(
        <div className="w-full">
            <div className="w-full px-4 py-3 border-2 border-cyan-700 bg-gradient-to-t from-[#4D9BA9] to-[var(--background-start-rgb)] ">
                <div className="text-white text-lg font-bold">{props.topic.title}</div>
                <div className="text-white text-md">{props.topic.description}</div>
            </div>
        </div>
    );
}
export default TopicCardHeader;