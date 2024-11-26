"use client";

import { FetchTopics } from "@/actions/forum/FetchTopics";
import { TopicType } from "@/database/repository/Topic";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { logger } from "@/utils/Logger";
import { ModalName } from "@/utils/enums/ModalEnum";
import { faCaretDown, faCaretUp, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ForumSideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const [topics, setTopics] = useState<TopicType[]>([]);

    const isSubmit = useAppSelector((state) => state.submit.toggle);

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

    const getChildTopics = (parentId: string) => {
        return topics.filter((topic) => topic.level === 1 && topic.parentId === parentId);
    };

    return (
        <div className="w-full bg-marrow text-white md:min-h-full min-h-0">
            <div className="px-6 py-3 font-bold text-xl border-b border-gray-700 flex justify-between">
                Discussions
                <span className="md:hidden text-white cursor-pointer ">
                    {isOpen ? (
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    )}
                </span>
            </div>
            <ul
                className={`${isOpen ? "scale-y-100 max-h-screen transition-y-0" : "scale-y-0 max-h-0 md:scale-y-100 md:max-h-screen pl-0 -transition-y-full"} transform transition-transform duration-300 ease-in-out`}>

                <li className="border-b border-gray-700 flex">
                    <button
                        onClick={(() => {
                            dispatch(modalActions.addModal({
                                type: ModalName.CreateDiscussion,
                                data: {}
                            }));
                            setIsOpen(false);
                        })}
                        className="py-2 px-4 w-full flex items-center justify-between bg-marrow text-cyan-300"
                    >
                        <span className="text-md font-semibold text-white">Create New Discussion Topics</span>
                        <span>
                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                        </span>
                    </button>
                </li>
                {topics && topics
                    .filter((topic: TopicType) => topic.level === 0)
                    .map((topic: TopicType, index: number) => (
                        topic.level === 0 && (
                            <ul key={index} className="pl-3 ">
                                <li className="border-b border-gray-700 flex flex-col">
                                    <button
                                        onClick={() => {
                                            dispatch(modalActions.addModal({
                                                type: ModalName.CreateDiscussion,
                                                data: {
                                                    parentId: topic.id,
                                                    level: 1,
                                                },
                                            }));
                                            setIsOpen(false);
                                        }}
                                        className="py-2 px-4 w-full flex items-center justify-between bg-marrow text-cyan-100"
                                    >
                                        <span className="text-md font-semibold">{topic.title}</span>
                                        <span>
                                            <FontAwesomeIcon title="Create new topic" icon={faPlusCircle} className="ml-2 text-lg" />
                                        </span>
                                    </button>
                                </li>
                                <ul className="pl-6 w-full">
                                    {getChildTopics(topic.id ?? "").map((childTopic) => (
                                        <li
                                            key={childTopic.id}
                                            className="border-b border-gray-700 py-2 px-4 flex justify-between items-center bg-marrow-light text-white hover:bg-marrow-lighter hover:text-white transition-all"
                                        >
                                            <span className="text-md font-semibold">{childTopic.title}</span>
                                        </li>
                                    ))}
                                </ul>


                            </ul>
                        )
                    ))}
            </ul>
        </div>
    );
}

export default ForumSideBar;