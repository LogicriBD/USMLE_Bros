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

function preprocessWordHTML(inputHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHtml, 'text/html');

    const conditionalBlocks = doc.querySelectorAll('span');

    conditionalBlocks.forEach((block) => {
        const imgTag = block.querySelector('img');
        if (imgTag) {
            block.replaceWith(imgTag);
        }
    });

    return doc.body.innerHTML;
}
type Props = {
    value: string;
    onChange: (content: any) => void;
}
export default function CustomEditor(props: Props) {

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
        onUpdate: ({ editor }) => {
            props.onChange(editor.getHTML());
        },
        editorProps: {
            handlePaste(view, event) {
                const clipboardData = event.clipboardData || (window as any).clipboardData;
                const items = clipboardData.items;

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item.type.startsWith('image/')) {
                        event.preventDefault();

                        const file = item.getAsFile();
                        if (file) {
                            const objectURL = URL.createObjectURL(file);

                            (editor as Editor).commands.insertContent(`<img src="${objectURL}" alt="pasted-image" />`);

                        }
                    }
                }

                const pastedHTML = clipboardData.getData('text/html');
                const preprocessHTML = preprocessWordHTML(pastedHTML)
                console.log('before ' + preprocessHTML);
                if (preprocessHTML) {
                    event.preventDefault();
                    const sanitizerConfig = {
                        ADD_TAGS: ['table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'img', 'a', 'span', 'div', 'br', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
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
                            'align'
                        ],
                        KEEP_CONTENT: true,
                    };
                    const cleanHTML = DOMPurify.sanitize(preprocessHTML, sanitizerConfig);
                    console.log('after ' + cleanHTML);
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

    return (
        <div className="border bg-white rounded-lg shadow-sm">
            <Toolbar editor={editor} />
            <div className="p-2">
                <EditorContent
                    content={props.value}
                    editor={editor}
                    className="prose"
                />
            </div>
        </div>
    )
}

