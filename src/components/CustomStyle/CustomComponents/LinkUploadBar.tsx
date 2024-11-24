"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
type Props = {
    editor: Editor;
    callback: () => void;
}
const LinkUploadBar = (props: Props) => {

    const [link, setLink] = useState<string>('');
    const [text, setText] = useState<string>('');

    const handleLinkUpload = () => {
        if (!link) return;

        const normalizedUrl = link.startsWith('http://') || link.startsWith('https://')
            ? link
            : `https://${link}`;
        props.editor.chain().focus().insertContent(`<a href="${normalizedUrl}">${text}</a>`).run();
        props.callback();
    }

    return (
        <div className="absolute top-full left-0 mt-2 z-10 bg-white border border-gray-300 shadow-lg rounded-md w-96 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Add Link</h3>
            <div className="mb-3">
                <label htmlFor="link-url" className="text-sm text-gray-600">
                    Link URL
                </label>
                <input
                    id="link-url"
                    type="text"
                    value={link}
                    placeholder="Enter the URL"
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:marrow-dark"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="link-text" className="text-sm text-gray-600">
                    Display Text
                </label>
                <input
                    id="link-text"
                    type="text"
                    placeholder="Enter the display text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:marrow-dark"
                />
            </div>
            <div className="flex justify-end gap-2 mt-3">
                <button
                    onClick={handleLinkUpload}
                    className="px-3 py-1.5 text-sm bg-marrow-dark text-white rounded-md hover:bg-marrow transition duration-150"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export { LinkUploadBar };
