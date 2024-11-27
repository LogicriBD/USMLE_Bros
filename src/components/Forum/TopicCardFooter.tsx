import { TopicType } from "@/database/repository/Topic";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
    topics: TopicType[]
}
const TopicCardFooter = (props:Props) => {
    return(
        <div className="w-full pr-3 pl-8 py-2 flex flex-row md:space-x-6 space-x-3 justify-start bg-gray-200">
            {props.topics && props.topics.map((topic:TopicType, index:number) => {
                return (
                    <div 
                        key={index}
                        className="cursor-pointer text-md text-marrow-dark hover:text-teal-500 transition duration-300 font-semibold flex flex-row space-x-2"
                    >
                        <span className="flex h-full items-center">
                            <FontAwesomeIcon
                                icon={faComment}
                                className="text-md text-marrow-dark " />
                        </span>
                        <span>{topic.title}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default TopicCardFooter;