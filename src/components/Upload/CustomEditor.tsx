/* eslint-disable react/display-name */
'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import DOMPurify from 'dompurify';
import Toolbar from './toolbar';
import ImageResize from 'tiptap-extension-resize-image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
function preprocessWordHTML(inputHtml)
{
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHtml, 'text/html');

    const conditionalBlocks = doc.querySelectorAll('span');

    conditionalBlocks.forEach((block) =>
    {
        const imgTag = block.querySelector('img');
        if (imgTag)
        {
            block.replaceWith(imgTag);
        }
    });

    return doc.body.innerHTML;
}
type Props = {
    value: string;
    onChange: (content: any) => void;
    sections?: string[];
}
const CustomEditor = forwardRef((props: Props, ref) =>
{
    const [sections, setSections] = useState<string[]>(props.sections || []);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            ImageResize,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                linkOnPaste: true,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content: props.value,
        onUpdate: ({ editor }) =>
        {
            const value = editor.getHTML();
            const parser = new DOMParser();
            const doc = parser.parseFromString(value, "text/html");
            const h1Elements = doc.querySelectorAll("h1");
            setSections([]);
            h1Elements.forEach((h1, index) =>
            {
                const content = h1.textContent?.trim() || "";
                setSections((sections) => [...sections, content]);
                const anchor = doc.createElement("a");
                anchor.name = content.replace(/\s+/g, "-").toLowerCase() + "_" + index + "_section";
                h1.before(anchor);
                h1.className = "text-3xl font-bold";
            });

            const tableElements = doc.querySelectorAll("table");
            tableElements.forEach((table) =>
            {
                table.classList.add("flex", "w-full");
            });

            const updatedHTML = doc.body.innerHTML;
            props.onChange(updatedHTML);
        },
        editorProps: {
            handlePaste(view, event)
            {
                const clipboardData = event.clipboardData || (window as any).clipboardData;
                const items = clipboardData.items;

                for (let i = 0; i < items.length; i++)
                {
                    const item = items[i];
                    if (item.type.startsWith('image/'))
                    {
                        event.preventDefault();

                        const file = item.getAsFile();
                        if (file)
                        {
                            const objectURL = URL.createObjectURL(file);

                            (editor as Editor).commands.insertContent(`<img src="${objectURL}" alt="pasted-image" />`);

                            setTimeout(() =>
                            {
                                URL.revokeObjectURL(objectURL);
                            }, 7200000);
                        }
                    }
                }

                const pastedHTML = clipboardData.getData('text/html');
                const preprocessHTML = preprocessWordHTML(pastedHTML)
                if (preprocessHTML)
                {
                    event.preventDefault();
                    const sanitizerConfig = {
                        ADD_TAGS: ['table',
                            'thead',
                            'tbody',
                            'tfoot',
                            'tr',
                            'td',
                            'th',
                            'img',
                            'a',
                            'span',
                            'div', 'br', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
                        ],
                        ADD_ATTR: [
                            'style',
                            'class',
                            'src',
                            'href',
                            'colspan',
                            'rowspan',
                            'width',
                            'height',
                            'alt',
                            'align',
                            'name'
                        ],
                        KEEP_CONTENT: true,
                    };
                    const cleanHTML = DOMPurify.sanitize(preprocessHTML, sanitizerConfig);
                    (editor as Editor).commands.insertContent(cleanHTML,
                        {
                            parseOptions: {
                                preserveWhitespace: false,
                            },
                        }
                    );
                    return true;
                }
                return false;
            },
        },
    });

    useImperativeHandle(ref, () => ({
        clearContents: () =>
        {
            editor?.commands.clearContent();
        },
    }));

    return (
        <div className="border bg-white rounded-lg shadow-sm w-full flex flex-col">
            <Toolbar editor={editor} />
            <div className="flex flex-row w-full">
                <div className="w-[100px] md:w-[300px] bg-marrow-dark text-sky-200 p-2">
                    <div className="font-bold text-lg ms-2">Sections</div>
                    <ul className="pl-4">
                        {sections.map((section, index) => (
                            <li key={index} className='break-words text-white py-2'>
                                <a href={`#${section.replace(/\s+/g, "-").toLowerCase()}_${index}_section`}>
                                    <FontAwesomeIcon icon={index !== 0 ? faLock : faUnlock} className='mr-2' />
                                    {section}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 flex w-full">
                    <EditorContent
                        content={props.value}
                        editor={editor}
                        className="prose overflow-x-auto w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
});

export default CustomEditor;