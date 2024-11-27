"use client"
import { TopicType } from "@/database/repository/Topic";
import { useEffect, useState } from "react";
import TopicCardHeader from "../TopicCardHeader";
import { FetchTopicById } from "@/actions/forum/FetchTopicById";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";

const ForumLevelTwo = ({id} : {id: string}) => {

    const [topic, setTopic] = useState<TopicType>({} as TopicType);
    const dispatch = useAppDispatch();
    const isSubmit = useAppSelector((state) => state.submit.toggle);

    const fetchTopicAndThreads = async () => {
        try{
            dispatch(loaderActions.turnOn());
            const topicActions = new FetchTopicById(id);
            const topic = await topicActions.execute();
            setTopic(topic);
        }catch(error){
            logger.error("Error fetching topic:", error);
        }finally{
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchTopicAndThreads();
    }, [isSubmit]);

    return(
        <div className="w-full h-full flex overflow-y-auto scrollbar-thin">
            <div className="w-full flex p-3">
                <TopicCardHeader topic={topic} />
            </div>
        </div>
    )
}

export default ForumLevelTwo;