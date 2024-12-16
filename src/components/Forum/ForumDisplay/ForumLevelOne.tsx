/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { TopicType } from "@/database/repository/Topic";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useEffect, useState } from "react";
import TopicCardHeader from "../TopicCardHeader";
import TopicCardBody from "../TopicCardBody";
import { FetchTopicsById } from "@/actions/forum/FetchTopicsById";
import { logger } from "@/utils/Logger";

const ForumLevelOne = ({ id }: { id: string }) =>
{

    const [thisTopic, setThisTopic] = useState<TopicType>({} as TopicType);
    const [subTopics, setSubTopics] = useState<TopicType[]>([]);

    const dispatch = useAppDispatch();
    const isSubmit = useAppSelector((state) => state.submit.toggle);

    const fetchTopics = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const topicActions = new FetchTopicsById(id);
            const topic = await topicActions.execute();
            setThisTopic(topic.topics);
            setSubTopics(topic.subTopics);
        } catch (error)
        {
            logger.log(error);
        } finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() =>
    {
        fetchTopics();
    }, [isSubmit]);

    return (
        <div className="w-full h-full px-2 py-4">
            <div className="w-full flex flex-col space-y-2 py-2 px-1">
                <div className="w-full shadow-md rounded-lg space-y-9">
                    <TopicCardHeader topic={thisTopic} />
                    <div className="divide-y divide-gray-300">
                        {subTopics && subTopics.map((topic, index) => (
                            <div className="w-full flex flex-col" key={index}>
                                <TopicCardBody topic={topic} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForumLevelOne;