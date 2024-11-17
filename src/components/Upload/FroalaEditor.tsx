"use client"
import React from "react";
import dynamic from "next/dynamic";
import { routes } from "@/src/api/Routes";
import { logger } from "@/utils/Logger";

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

const modifiedEditorConfiguration = (value: string, onChange: (newContent: string, imageUrl?: string) => void) => {
    return {
        toolbarButtons: [
            "bold", "italic", "underline", "|", "insertSections", "|",
            "fontSize", "fontFamily", "formatOL", "formatUL", "paragraphFormat", "align", "insertLink", "insertImage",
            "insertTable", "|", "undo", "redo", "fullscreen", "html"
        ],
        toolbarButtonsXS: ["insertSections"],
        pluginsEnabled: ['customButtons'],
        customButtons: {
            insertSections: {
                title: 'Insert Sections',
                type: 'dropdown',
                icon: 'fa fa-heading', 
                options: {
                    heading1: 'Section',
                    heading2: 'Subsection',
                    heading3: 'Subsubsection'
                },
                callback: function (cmd, val) {
                    const editor = this as any;
                    switch (val) {
                        case 'heading1':
                            editor.html.insert('<h1>Section</h1>');
                            break;
                        case 'heading2':
                            editor.html.insert('<h2>Subsection</h2>');
                            break;
                        case 'heading3':
                            editor.html.insert('<h3>Subsubsection</h3>');
                            break;
                    }
                }
            }
        },
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
        charCounterMax: -1,
        colorsText: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        colorsBackground: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF'],
        fontSize: [10, 12, 14, 16, 18, 20],
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
