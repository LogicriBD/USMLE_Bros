"use client";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import SpinLoading from "../Spinner";
import { useEffect, useState } from "react";
import { ContentMetaData } from "@/database/repository/Content";
import { ContentFetchRecent } from "@/actions/content/ContentFetchRecent";
import { useNavigate } from "@/src/hooks/useNavigate";

const RecentPosts = () => {

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [recentPosts, setRecentPosts] = useState<ContentMetaData[]>([]);

    const fetchRecentPosts = async () => {
        try {
            setLoading(true);
            const action = new ContentFetchRecent();
            const recentPosts = await action.execute();
            setRecentPosts(recentPosts);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecentPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full">
                <SpinLoading />
            </div>
        );
    }

    return (
        <div className="flex tablet:w-96 md:w-82 w-72 h-auto max-h-96 overflow-y-auto scroll-smooth rounded-lg bg-white shadow-md z-20">
            <div className="flex w-full flex-col items-start divide-y-2 divide-gray-300 divide-solid">
                <div className="text-lg font-bold text-black text-start flex w-full px-4 py-3 bg-gray-100">
                    Recently Posted
                </div>
                {recentPosts.length > 0 ? (
                    recentPosts.map((post, index) => (
                        <div
                            key={index}
                            onClick={()=> navigate(`/content/${post.id}`)}
                            className="flex flex-col w-full bg-white hover:bg-gray-50 transition duration-300 cursor-pointer px-4 py-2"
                        >
                            <h3 className="font-semibold text-sm text-gray-800">{post.title}</h3>
                            <p className="text-xs text-gray-600">{post.userName}</p>
                            <p className="text-xs text-gray-500">{formatFirebaseDate(post.createdAt)}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500 p-4">
                        No recent posts available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentPosts;