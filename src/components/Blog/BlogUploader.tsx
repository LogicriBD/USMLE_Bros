"use client";

import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { routes } from "@/src/api/Routes";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { createBlog } from "@/actions/blog/CreateBlog";
import { BlogType } from "@/utils/enums/Blog";
import { Blog, BlogData, BlogMetadata } from "@/database/repository/Blog";
import CustomEditor from "../Upload/CustomEditor";

const BlogUploader = () => {
    const editorRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState({ title: "", preview: "", content: "", type:"" });
    const [formData, setFormData] = useState({ title: "", previewImage: null, content: "", type:BlogType.BLOG });
    const [images, setImages] = useState<string[]>([]);

    const handleContentChange = (newContent: string, imageUrl?: string) => {
        if (imageUrl) {
            setImages((prev) => [...prev, imageUrl])
        }
        setFormData((prev) => ({ ...prev, content: newContent }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (validImageTypes.includes(file.type)) {
                setError((prev) => ({ ...prev, preview: "" }));
                setFormData((prev) => ({ ...prev, previewImage: file }));
            } else {
                setError((prev) => ({ ...prev, preview: "Please upload a valid image file." }));
                setFormData((prev) => ({ ...prev, previewImage: null }));
            }
        }
    };

    const isError = () => {
        return !!error.title || !!error.preview || !!error.content;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isError()) return;


        if (!formData.title) {
            setError((prev) => ({ ...prev, title: "Title is required." }));
            return;
        }

        if (!formData.previewImage) {
            setError((prev) => ({ ...prev, preview: "Preview image is required." }));
            return;
        }

        if (!formData.content) {
            setError((prev) => ({ ...prev, content: "Content is required." }));
            return;
        }

        if (!formData.type) {
            setError((prev) => ({ ...prev, type: "Type is required." }));
            return;
        }

        try {
            dispatch(loaderActions.turnOn());
            const imageUrl = await uploadImage();

            const blogmetadata: BlogMetadata = {
                title: formData.title,
                category: formData.type,
                userName: user.name,
                createdAt: new Date(),
                userId: user.id,
                imageUrl: imageUrl
            };
            const newContent = await uploadAndReplaceImageSrc();
            const blogData: BlogData = {
                content: newContent,
            }

            const blog: Blog = {
                metadata: blogmetadata,
                content: blogData
            }

            const blogActions = new createBlog({ blog: blog });
            await blogActions.execute();
            setFormData({ title: "", previewImage: null, content: "", type:BlogType.BLOG });
            if(editorRef.current){
                editorRef.current.clearContents();
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    };

    const uploadImage = async () => {
        const f = new FormData();
        if (formData.previewImage) {
            f.append("file", formData.previewImage);
        }

        try {
            const response = await fetch(routes.content.upload, {
                method: "POST",
                body: f,
            });
            const data = await response.json();
            console.log("Image Uploaded:", data.file.url);
            if(fileInputRef.current) fileInputRef.current.value = "";
            return data.file.url as string;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    }

    const handleTitleChange = (event) => {
        setFormData((prev) => ({ ...prev, title: event.target.value }));

        if (error.title) { setError((prev) => ({ ...prev, title: "" })) }
    }

    const handleTypeChange = (event) => {
        setFormData((prev) => ({ ...prev, type: event.target.value }));

        if (error.type) { setError((prev) => ({ ...prev, type: "" })) }
    }

    const uploadAndReplaceImageSrc = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(formData.content, 'text/html');
        const imgTags = Array.from(doc.querySelectorAll('img'));
    
        for (const imgTag of imgTags) {
            const src = imgTag.getAttribute('src');
            if (src) {
                const file = await fetch(src).then((r) => r.blob());
                const formData = new FormData();
                formData.append('file', file);
    
                try {
                    const response = await fetch(routes.content.upload, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    console.log("Image Uploaded:", data.file.url);
                    imgTag.setAttribute('src', data.file.url);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }
    
        formData.content = doc.body.innerHTML;
        return formData.content;
    };

    return (
        <div className="w-full h-full flex flex-col py-4 px-3 space-y-2">
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between space-x-2">
                    <Form.Group className="mb-3 w-5/6">
                        <Form.Label className="text-marrow-dark font-bold">Title</Form.Label>
                        <Form.Control
                            className="rounded-lg w-full text-black font-semibold bg-white"
                            type="text"
                            name="title"
                            placeholder="Set a title for blog..."
                            value={formData.title}
                            onChange={handleTitleChange}
                            isInvalid={!!error.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 w-1/6">
                        <Form.Label className="text-marrow-dark font-bold">Type</Form.Label>
                        <Form.Select
                            className="rounded-lg text-black font-semibold bg-white"
                            name="type"
                            value={formData.type}
                            onChange={handleTypeChange}
                            isInvalid={!!error.type}
                        >
                            <option value={BlogType.BLOG}>Blog</option>
                            <option value={BlogType.EXAM_UPDATES}>Exam Updates</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {error.type}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className="text-marrow-dark font-bold">Preview Image</Form.Label>
                    <Form.Control
                        ref={fileInputRef}
                        className="rounded-lg text-black font-semibold bg-white"
                        type="file"
                        name="previewImage"
                        onChange={handleFileChange}
                        isInvalid={!!error.preview}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error.preview}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 h-fit">
                    <Form.Label className="text-marrow-dark font-bold">Content</Form.Label>
                    <CustomEditor ref={editorRef} value={formData.content} onChange={handleContentChange} />
                    <Form.Control.Feedback type="invalid">
                        {error.content}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 flex justify-end">
                    <button className="px-3 py-2 rounded-lg bg-marrow-dark text-white text-md font-semibold">
                        Submit
                    </button>
                </Form.Group>
            </Form>
        </div>
    );
}
export default BlogUploader;