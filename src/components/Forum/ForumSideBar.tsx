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
                className={`${isOpen ? "scale-y-100 max-h-screen" : "scale-y-0 max-h-0 md:scale-y-100 md:max-h-screen pl-0"}`}>

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
                        <span className="text-md">Create New Discussion Topics</span>
                        <span>
                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                        </span>
                    </button>
                </li>
                {topics && topics.map((topic: TopicType, index: number) => (
                    <ul
                        key={index}
                        className="pl-3"
                    >
                        <li className="border-b border-gray-700 flex">
                            <button
                                onClick={(() => {
                                    dispatch(modalActions.addModal({
                                        type: ModalName.CreateDiscussion,
                                        data: {
                                            parentId: topic.id,
                                            level: 1,
                                        },
                                    }));
                                    setIsOpen(false);
                                })}
                                className="py-2 px-4 w-full flex items-center justify-between bg-marrow text-cyan-300"
                            >
                                <span className="text-md">{topic.title}</span>
                                <span>
                                    <FontAwesomeIcon title="Create new topic" icon={faPlusCircle} className="ml-2 text-lg" />
                                </span>
                            </button>
                        </li>
                    </ul>
                ))}
            </ul>
        </div>
    );
}

export default ForumSideBar;