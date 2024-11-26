"use client";

import { FetchTopics } from "@/actions/forum/FetchTopics";
import { TopicType } from "@/database/repository/Topic";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";
import TopicCardHeader from "./TopicCardHeader";
import TopicCardBody from "./TopicCardBody";

const ForumAdminMain = () => {

    const [topics, setTopics] = useState<TopicType[]>([]);

    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const dispatch = useAppDispatch();

    const fetchTopics = async () => {
        try {
            dispatch(loaderActions.turnOn())
            const topicActions = new FetchTopics();
            const data = await topicActions.execute();
            setTopics(data);
        } catch (error: any) {
            logger.log(error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchTopics();
    }, [isSubmit]);

    const getChildTopics = (parentId: string) =>
        topics.filter((topic) => topic.level === 1 && topic.parentId === parentId);

    return (
        <div className="w-full h-full px-1">
            <div className="w-full flex flex-col space-y-2 py-2 px-1">
                {topics && topics
                    .filter((topic) => topic.level === 0)
                    .map((topic) => (
                        <div className="w-full shadow-md rounded-lg">
                            <TopicCardHeader topic={topic} />
                            <div className="divide-y divide-gray-300">
                                {getChildTopics(topic.id ?? "").map((childTopic) => (
                                    <TopicCardBody topic={childTopic} />
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ForumAdminMain;