"use client"
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { routes } from "@/src/api/Routes";
import { logger } from "@/utils/Logger";
import { Dom } from "jodit/esm/modules";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const modifiedEditorConfiguration = (value: string, onChange: (newContent: string) => void) =>
{
    return {
        readonly: false,
        toolbarSticky: true,
        toolbarButtonSize: "large",
        toolbarAdaptive: false,
        toolbar: true,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        colors: {
            greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
            palette: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
            full: [
                '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
                '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
                '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
                '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
                '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
                '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
            ]
        },
        removeButtons: process.env.NODE_ENV === 'production' ? ['source'] : [],
        disablePlugins: [],
        extraButtons: [],
        buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "underline",
            'fontsize',
            'font',
            "brush",
            "|",
            "superscript",
            "subscript",
            "|",
            "ul",
            "ol",
            "|",
            "paragraph",
            "|",
            'table',
            "link",
            "image",
            "|",
            'hr',
            "align",
            "outdent",
            "indent",
            "|",
            'fullsize',
            'print',
            "|",
            "undo",
            "redo",
            {
                name: "Insert Section",
                tooltip: 'Wrap selection in tag',
                list: ['Section', 'Subsection', 'Subsubsection'],

                childTemplate: (editor, key, value) =>
                {
                    if (key === 'Section')
                    {
                        return `<span class="h1">${editor.i18n(value)}</span>`
                    }
                    else if (key === 'Subsection')
                    {
                        return `<span class="h2">${editor.i18n(value)}</span>`
                    }
                    else
                    {
                        return `<span class="h3">${editor.i18n(value)}</span>`
                    }
                },

                isChildActive: (editor, control) =>
                {
                    const current = editor.s.current();

                    if (current)
                    {
                        const currentBox = Dom.closest(
                            current,
                            (node) => Dom.isTag(node, control.list),
                            editor.editor
                        );

                        return Boolean(
                            currentBox &&
                            currentBox !== editor.editor &&
                            control.args !== undefined &&
                            currentBox.nodeName.toLowerCase() === control.args[0]
                        );
                    }

                    return false;
                },

                exec(editor, _, { control })
                {
                    let selectedValue = control.args && control.args[0];
                    let value = "h1"
                    if (selectedValue === "Subsection")
                    {
                        value = "h2"
                    }
                    else if (selectedValue === "Subsubsection")
                    {
                        value = "h3"
                    }
                    else
                    {
                        selectedValue = "Section"
                    }
                    editor.s.insertHTML(`<${value}>${selectedValue}</${value}>`)
                    return false;
                }
            }
        ],
        uploader: {
            url: routes.content.upload,
            format: 'multipart',
            method: 'POST',
            filesVariableName: () => 'file',
            process: (data) =>
            {
                const formData = new FormData();
                formData.append('file', data.file.url)
                return formData
            },
            defaultHandlerSuccess: function (data)
            {
                const url = data.get('file') as string;
                console.log(url);
                onChange(`${value}<img src="${url}"/>`)
            },
            error: function (e)
            {
                logger.error(e);
            }

        },
        height: 650
    };
}

export default function Editor({ value, onChange })
{
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={value}
            config={{
                ...modifiedEditorConfiguration(value, onChange),
                toolbarButtonSize: "middle",
                colorPickerDefaultTab: "background",
            }}
            onBlur={(content) => onChange(content)}
        />
    );
}
