"use client"
import { useEffect, useState } from "react";
import BlogCategories from "./BlogCategories";
import { BlogMetadata } from "@/database/repository/Blog";
import { FetchBlogsByCategory } from "@/actions/blog/FetchBlogsByCategory";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { BlogType } from "@/utils/enums/Blog";
import BlogCard from "./BlogCard";

export const dummyBlogMetadata: BlogMetadata[] = [
    {
        id: "1",
        title: "Exploring React Hooks",
        category: BlogType.BLOG,
        userName: "John Doe",
        createdAt: new Date("2024-01-01"),
        userId: "user123",
        imageUrl: "https://via.placeholder.com/300x200?text=React+Hooks",
    },
    {
        id: "2",
        title: "The Art of Baking",
        category: BlogType.BLOG,
        userName: "Jane Smith",
        createdAt: new Date("2024-01-15"),
        userId: "user456",
        imageUrl: "https://via.placeholder.com/300x200?text=Baking+Art",
    },
    {
        id: "3",
        title: "Traveling the World",
        category: BlogType.BLOG,
        userName: "Emily Johnson",
        createdAt: new Date("2024-02-05"),
        userId: "user789",
        imageUrl: "https://via.placeholder.com/300x200?text=World+Travel",
    },
    {
        id: "4",
        title: "Fitness Tips for Beginners",
        category: BlogType.BLOG,
        userName: "Michael Brown",
        createdAt: new Date("2024-03-10"),
        userId: "user101",
        imageUrl: "https://via.placeholder.com/300x200?text=Fitness+Tips",
    },
    {
        id: "5",
        title: "Mastering Photography",
        category: BlogType.BLOG,
        userName: "Anna Davis",
        createdAt: new Date("2024-04-20"),
        userId: "user202",
        imageUrl: "https://via.placeholder.com/300x200?text=Photography+Mastery",
    },
];


const BlogMetadataView = () => {

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
        <div className="w-full h-full flex flex-col items-center space-y-2">
            <BlogCategories />
            <div className="w-auto h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 overflow-y-auto scrollbar-thin p-2">
                {dummyBlogMetadata.map((blog) => (
                    <BlogCard key={blog.id} {...blog} />
                ))}
            </div>
        </div>
    );
}
export default BlogMetadataView;