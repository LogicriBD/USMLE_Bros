"use client"
import { Paperclip } from "lucide-react";
import { useRef } from "react";

const ImageUploadBar = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };
    return (
        <div className="absolute top-full left-0 mt-2 bg-white p-2 w-max h-auto z-10 shadow-lg rounded-lg border border-gray-300 transition-all ease-in-out duration-300">
            <label htmlFor="file-upload" className="block text-gray-700 font-medium text-sm mb-2">
                Upload an Image
            </label>
            <div 
                onClick={handleDivClick}
                className="flex items-center justify-between bg-gray-100 border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                <span className="text-gray-600 text-sm">Choose a file</span>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                />
                <Paperclip className="h-4 w-4 text-gray-600 ml-2" />
            </div>
        </div>
    );
}

export { ImageUploadBar };