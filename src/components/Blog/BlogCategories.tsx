"use client";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { blogActions } from "@/src/context/store/slices/blog-slice";
import { BlogType } from "@/utils/enums/Blog";

type IButton = {
    text: BlogType;
}
export const BlogButtons = (props: IButton) => {

    const selectedCategory = useAppSelector((state) => state.blog.category);
    const isSelected = selectedCategory === props.text;

    const dispatch = useAppDispatch();

    return(
        <div 
            onClick={() => dispatch(blogActions.setCategory(props.text))}
            className={`${isSelected ? "bg-sky-700" : "bg-sky-400 cursor-pointer"} text-white text-md font-semibold py-2 px-3 rounded-md hover:bg-sky-700 `}>
            {props.text}
        </div>
    )
}

const BlogCategories = () => {
    return(
        <div className="w-full py-2 flex flex-row justify-center items-center space-x-2">
            <BlogButtons text={BlogType.BLOG}/>
            <BlogButtons text={BlogType.EXAM_UPDATES} />
        </div>
    );
}
export default BlogCategories;