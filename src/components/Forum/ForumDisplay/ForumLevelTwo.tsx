"use client"
import { TopicType } from "@/database/repository/Topic";
import { useEffect, useState } from "react";
import TopicCardHeader from "../TopicCardHeader";
import { FetchTopicById } from "@/actions/forum/FetchTopicById";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";
import { FetchThreadsByTopicId } from "@/actions/forum/FetchThreadsByTopic";
import { ThreadType } from "@/database/repository/Thread";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { useRouter } from "next/navigation";

const ForumLevelTwo = ({ id }: { id: string }) => {
    
    const [topic, setTopic] = useState<TopicType>({} as TopicType);
    const [threads, setThreads] = useState<ThreadType[]>([]);

    const router = useRouter();

    const dispatch = useAppDispatch();
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const user = useAppSelector((state) => state.user);

    const fetchTopicAndThreads = async () => {
        try {
            dispatch(loaderActions.turnOn());
            const topicActions = new FetchTopicById(id);
            const topic = await topicActions.execute();
            setTopic(topic);

            const threadActions = new FetchThreadsByTopicId({ topicId: id });
            const threads = await threadActions.execute();
            setThreads(threads);
        } catch (error) {
            logger.error("Error fetching topic:", error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    }

    const onCreateClicked = () => {
        if(user.name === ""){
            router.push("/authentication/login");
        }else{
            dispatch(modalActions.addModal({
                type: ModalName.CreateThread,
                data: {
                    topicId: id
                }
            }))
        }
    }

    useEffect(() => {
        fetchTopicAndThreads();
    }, [isSubmit]);

    return (
        <div className="w-full h-full flex overflow-y-auto scrollbar-thin">
            <div className="w-full flex flex-col p-3 space-y-4">
                <TopicCardHeader topic={topic} />
                <div className="w-full flex flex-col border-2 border-teal-800">
                    <div className="w-full bg-marrow px-3 py-2 flex justify-end">
                        <button
                            onClick={onCreateClicked}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white text-md font-bold py-2 px-3 rounded-lg hover:scale-105 transition duration-300 "
                        >
                            Create Thread
                        </button>
                    </div>
                    <div className="w-full flex flex-col divide-y divide-gray-400 ">
                        {threads.length > 0 ? (
                            threads.map((thread: ThreadType, index: number) => (
                                <div
                                    key={index}
                                    className="w-full bg-gray-100 px-4 py-2 flex flex-col md:flex-row items-start md:items-center justify-between"
                                >
                                    {/* Thread Details */}
                                    <div className="flex-1 text-marrow-dark flex flex-col space-y-2">
                                        <div className="font-semibold text-lg">{thread.title}</div>
                                        <div className="font-normal text-gray-600 text-sm">{thread.description}</div>
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0 md:ml-8 text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500">Posts</span>
                                            <span className="font-semibold">{thread.posts ?? 0}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500">Created By</span>
                                            <span className="font-semibold">{thread.createdBy}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500">Created At</span>
                                            <span className="font-semibold">
                                                {formatFirebaseDate(thread.createdAt, true)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500">Last Updated</span>
                                            <span className="font-semibold">
                                                {formatFirebaseDate(thread.updatedAt, true)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full p-6 text-center flex flex-col font-bold text-xl text-gray-600">
                                No Threads Found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumLevelTwo;