import { type Editor } from '@tiptap/react'
import { ImageUploadBar, LinkUploadBar, Toggle } from '../CustomStyle/CustomComponents';
import { Button } from '../CustomStyle/CustomComponents';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Image as ImageIcon, Link, Heading1, ListOrdered, Strikethrough, Heading2, Heading3, Undo, Redo } from 'lucide-react'
import { useState } from 'react';

interface ToolbarProps
{
    editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps)
{

    const [showImageBar, setShowImageBar] = useState<boolean>(false);
    const [showLinkBar, setShowLinkBar] = useState<boolean>(false);

    if (!editor)
    {
        return null
    }

    const addImage = () =>
    {
        setShowImageBar(!showImageBar);
        setShowLinkBar(false);
    }

    const handleImageUpload = (e: any) =>
    {
        const file = e.target.files[0];
        if (file)
        {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (validImageTypes.includes(file.type))
            {
                const objectUrl = URL.createObjectURL(file);
                editor.chain().focus().setImage({ src: objectUrl }).run();
            }
        }
        setShowImageBar(false);
    }

    const setLink = () =>
    {
        setShowLinkBar(!showLinkBar);
        setShowImageBar(false);
    }

    return (
        <div className="bg-white z-50 sticky top-0 border-b p-2 flex flex-wrap gap-2">
            <Toggle
                title='Bold'
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Italic'
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Underline'
                pressed={editor.isActive('underline')}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Strikethrough'
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Left Align'
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Center Align'
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Right Align'
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Bullet List'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Ordered List'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
            <div className='relative flex flex-col'>
                <Button title='Image' size="sm" onClick={addImage}>
                    <ImageIcon className="h-4 w-4 text-white" />

                </Button>
                {showImageBar && (
                    <ImageUploadBar handleImageUpload={handleImageUpload} />
                )}
            </div>
            <div className='relative flex flex-col'>
                <Button title="Link" size="sm" onClick={setLink}>
                    <Link className="h-4 w-4 text-white" />
                </Button>
                {showLinkBar && (
                    <LinkUploadBar editor={editor} callback={setLink} />
                )}
            </div>

            <Toggle
                title='Heading 1'
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Heading 2'
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                title='Heading 3'
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>
            <Button title='Undo' variant='outline' size="sm" onClick={() => editor.chain().focus().undo().run()}>
                <Undo className="h-4 w-4" />
            </Button>
            <Button title='Redo' variant='outline' size="sm" onClick={() => editor.chain().focus().redo().run()}>
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    )
}

