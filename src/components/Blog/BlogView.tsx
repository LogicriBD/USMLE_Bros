"use client"
import { useEffect, useState } from "react";
import BlogCategories from "./BlogCategories";
import { BlogMetadata } from "@/database/repository/Blog";
import { FetchBlogsByCategory } from "@/actions/blog/FetchBlogsByCategory";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

const BlogView = () => {

    const [blogMetadata, setBlogMetadata] = useState<BlogMetadata[]>([]);
    const category = useAppSelector((state) => state.blog.category);
    const dispatch = useAppDispatch();

    const fetchBlogs = async () => {
        try{
            dispatch(loaderActions.turnOn());
            const blogs = new FetchBlogsByCategory(category);
            const blogData = await blogs.execute();
            setBlogMetadata(blogData);
        }catch(err: any){
            console.log(err);
        }finally{
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [category]);

    return(
        <div className="w-full h-full flex flex-col space-y-2">
            <BlogCategories />
            <div className="w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 overflow-y-auto scrollbar-thin p-2">
                
            </div>
        </div>
    );
}
export default BlogView;