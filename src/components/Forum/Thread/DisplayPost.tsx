"use client";
import { CommentType, PostType } from "@/database/repository/Post"
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { faUser, faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SpinLoading from "../../Spinner";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { CreateComment } from "@/actions/forum/CreateComment";
import { logger } from "@/utils/Logger";
import DisplayComment from "./DisplayComment";
import { Roles } from "@/utils/enums/Roles";
import { DeletePost } from "@/actions/forum/DeletePost";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

type Props = {
    post: PostType;
}
const DisplayPost = (props: Props) => {

    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user);

    const handleReply = async () => {
        try {
            if (!props.post.id || !user.id || !user.name || comment.trim() === "") {
                return;
            }
            setLoading(true);
            const newComment: CommentType = {
                userId: user.id,
                userName: user.name,
                content: comment,
                createdAt: new Date(),
                postId: props.post.id
            }
            const commentActions = new CreateComment(props.post.id, newComment);
            await commentActions.execute();
        } catch (error: any) {
            logger.log("Error creating comment:", error);
        } finally {
            setLoading(false);
            setComment("");
        }
    }

    const deletePost = async () => {
        try{
            dispatch(loaderActions.turnOn());
            const deleteActions = new DeletePost(props.post.id);
            await deleteActions.execute();
        }catch(error:any){
            logger.log("Error deleting post:", error);
        }finally{
            dispatch(loaderActions.turnOff());
        }
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-100 rounded-t-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-teal-600 text-lg"
                    />
                    <span className="font-medium text-sm">{props.post.userName}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500 text-sm">
                    <span>
                        <FontAwesomeIcon icon={faClock} className="text-teal-600 mr-1" />
                        <span>{formatFirebaseDate(props.post.createdAt, true)}</span>
                    </span>
                    <span>
                        {user.id !== "" && user.role === Roles.Admin && (
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-pointer text-xl hover:scale-125 duration-300 transition"
                                onClick={deletePost}
                            />
                        )}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <p className="text-gray-800 text-md leading-relaxed whitespace-pre-wrap">
                    {props.post.content}
                </p>
            </div>

            {user.id !== "" && (
                <div className="px-4 py-2 border-t border-gray-100 bg-gray-100 rounded-b-lg flex justify-between items-center space-x-2">
                    <span className="w-full">
                        <textarea
                            className="flex-1 h-10 p-2 w-full rounded-md border focus:outline-2 focus:outline-teal-500 bg-gray-50 text-sm"
                            placeholder="Write a comment..."
                            value={comment}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleReply()
                                }
                            }}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </span>
                    {!loading ? (
                        <button
                            className="text-sm bg-marrow-dark font-semibold rounded-lg text-gray-100 hover:scale-105 py-2 px-3 transition duration-300"
                            onClick={handleReply}
                        >
                            Reply
                        </button>
                    ) : (
                        <SpinLoading />
                    )}
                </div>
            )}
            <div className="w-full max-h-96 h-fit flex flex-col overflow-y-auto scrollbar-thinP">
                {props.post.comments && props.post.comments.length > 0 && (
                    props.post.comments.map((comment: CommentType, index: number) => (
                        <DisplayComment key={index} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DisplayPost;