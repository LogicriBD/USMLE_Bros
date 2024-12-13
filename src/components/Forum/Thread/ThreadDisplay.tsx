/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FetchThreadById } from "@/actions/forum/FetchThreadById";
import { ThreadType } from "@/database/repository/Thread";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { motion } from "framer-motion";
import { Post, PostType } from "@/database/repository/Post";
import DisplayPost from "./DisplayPost";
const ThreadDisplay = ({ id }: { id: string }) =>
{
    const [thread, setThread] = useState<ThreadType>({} as ThreadType);
    const [canCreate, setCanCreate] = useState<boolean>(false);

    const [posts, setPosts] = useState<PostType[]>([]);

    const user = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onCancel = () =>
    {
        setCanCreate(false);
    }

    const fetchThread = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const threadActions = new FetchThreadById(id);
            const thread = await threadActions.execute();
            setThread(thread);
        } catch (error: any)
        {
            logger.log("Error fetching thread:", error);
        } finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    const onCreateClicked = () =>
    {
        if (user.name === "")
        {
            router.push("/authentication/login");
        } else
        {
            setCanCreate(!canCreate);
        }
    }

    useEffect(() =>
    {
        fetchThread();
    }, []);

    const handleNewPosts = (newPosts: PostType[]) =>
    {
        setPosts(newPosts);
    }

    useEffect(() =>
    {
        const unsubscribe = Post.FetchPostsByThreadId(id, (newPosts: PostType[]) =>
        {
            handleNewPosts(newPosts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full h-full flex flex-col py-2 px-2 space-y-3">
            <div className="sticky top-0 flex md:flex-row space-y-2 flex-col justify-between items-center w-full px-4 py-2 border-2 border-cyan-700 bg-gradient-to-t from-[#4D9BA9] to-[var(--background-start-rgb)]">
                <span className="flex flex-col">
                    <div className="md:text-xl text-lg font-semibold text-white">{thread.title}</div>
                    <div className="md:text-md text-sm font-normal text-white">{thread.description}</div>
                </span>
                <span className="">
                    <button
                        onClick={onCreateClicked}
                        className="bg-cyan-500 md:text-md text-sm hover:scale-105 hover:bg-cyan-600 transition duration-300 rounded-md text-white font-semibold px-3 py-2">

                        <FontAwesomeIcon
                            icon={faPen}
                            className="text-white mr-2" />
                        Add New Post
                    </button>
                </span>
            </div>
            {canCreate && (
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <CreatePost thread={thread} onCancel={onCancel} />
                </motion.div>
            )}
            {posts.length > 0 && (
                posts.map((post: PostType, index: number) => (
                    <DisplayPost key={index} post={post} />
                ))
            )}
        </div>
    )
}

export default ThreadDisplay;