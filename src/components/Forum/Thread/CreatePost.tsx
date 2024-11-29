"use client";

import { ThreadType } from "@/database/repository/Thread";
import { useState } from "react";
import { CreatePost as Create } from "@/actions/forum/CreatePost";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { PostType } from "@/database/repository/Post";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";
import DOMPurify from 'dompurify';

type Props = {
    thread:ThreadType;
    onCancel(): void;
}
const CreatePost = (props:Props) => {

    const [content, setContent] = useState<string>("");
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const createPost = async() => {
        try{

            if(props.thread.id === undefined || user.id === "" || user.name === ""){
                return;
            }

            dispatch(loaderActions.turnOn());

            const sanitizedContent = DOMPurify.sanitize(content);

            let post:PostType = {
                threadId: props.thread.id,
                userId: user.id,
                userName: user.name,
                content: sanitizedContent
            }

            const postActions = new Create(post);
            await postActions.execute();
        }catch(error:any){
            logger.error("Error creating post:", error);
        }finally{
            dispatch(loaderActions.turnOff());
            props.onCancel();
        }
    }

    return(
        <div className="w-full h-fit flex flex-col bg-gray-100 rounded-lg shadow-md">
            <div className="w-full flex justify-start pt-2 pb-1 px-3 text-gray-600 text-md font-semibold">
                Create New Post
            </div>
            <div className="w-full px-3 py-1">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-32 p-2 rounded-lg border-2 border-gray-300 focus:outline-2 focus:border-none focus:outline-teal-500 bg-gray-100 text-gray-600 text-md font-normal"
                    placeholder="Write your post here"
                />
            </div>
            <div className="w-full flex flex-row space-x-2 justify-end px-3 py-1">
                <button
                    onClick={createPost}
                    className="bg-marrow hover:bg-marrow-dark text-white text-sm font-bold py-2 px-3 rounded-md hover:scale-105 transition duration-300"
                >Create</button>
                <button
                    onClick={props.onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-semibold py-2 px-3 rounded-md hover:scale-105 transition duration-300"
                >Cancel</button>
            </div>
        </div>
    );
}

export default CreatePost;