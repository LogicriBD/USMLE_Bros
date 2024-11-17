"use client"
import React from "react";
import dynamic from "next/dynamic";
import { routes } from "@/src/api/Routes";
import { logger } from "@/utils/Logger";

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

const modifiedEditorConfiguration = (value: string, onChange: (newContent: string, imageUrl?: string) => void) => {
    return {
        toolbarButtons: [
            "bold", "italic", "underline", "fontSize", "fontFamily", "formatOL", "formatUL", "paragraphFormat", "align", "insertLink", "insertImage",
            "insertTable", "|", "undo", "redo", "fullscreen", "html"
        ],
        heightMin: 300,
        heightMax: 650,
        placeholderText: "Start writing here...",
        events: {
            'froalaEditor.contentChanged': function (e, editor) {
                onChange(editor.html.get());
            }
        },
        imageUploadURL: routes.content.upload,
        imageUploadMethod: 'POST',
        imageUploadParams: (data) => {
            const formData = new FormData();
            formData.append('file', data.file.url);
            return formData;
        },
        fileUploadParams: (data) => {
            const formData = new FormData();
            formData.append('file', data.file.url);
            return formData;
        },
        fileUploadError: function (error) {
            logger.error("File upload error:", error);
        },
        imageUploadError: function (error) {
            logger.error("Image upload error:", error);
        },
        charCounterCount: true,
        charCounterMax: 5000,
        colorsText: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        colorsBackground: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF'],
        fontFamily: ['Arial', 'Georgia', 'Courier'],
        fontSize: [12, 14, 16, 18, 20],
        linkList: [
            { text: 'Froala', href: 'https://froala.com' },
            { text: 'Next.js', href: 'https://nextjs.org' }
        ],
    };
};

export default function Editor({ value, onChange }) {
    return (
        <FroalaEditor
            model={value}
            config={{
                ...modifiedEditorConfiguration(value, onChange),
                toolbarButtonSize: "middle",
                colorPickerDefaultTab: "background",
            }}
        />
    );
}
