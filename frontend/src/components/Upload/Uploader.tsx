import { useAppSelector } from "@/src/context/store/hooks";
import MyJoditEditor from "./Editor/JoditEditor";
import { useState } from "react";

const Uploader = () => {

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);

    const [content, setContent] = useState("");

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return selectedCategory ? (
        <div className="w-full bg-inherit px-2">
            <div className="w-full p-3 flex justify-center items-center text-black md:text-4xl text-2xl font-bold border-b border-gray-400">{selectedCategory?.name}</div>
            <div className="h-full p-3">
                <MyJoditEditor value={content} onChange={handleContentChange} />
            </div>
        </div>
    ) : (
        <div className="w-full bg-inherit">
            <div className="w-full p-3 flex justify-center items-center text-black md:text-4xl text-2xl font-bold">Select a Category</div>
        </div>
    );
}

export default Uploader;