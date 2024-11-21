"use client";

import { useState } from "react";
import { Form } from "react-bootstrap";
import Editor from "../Upload/Editor";
import { routes } from "@/src/api/Routes";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { createBlog } from "@/actions/blog/CreateBlog";
import { BlogType } from "@/utils/enums/Blog";
import { Blog, BlogData, BlogMetadata } from "@/database/repository/Blog";

const BlogUploader = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const [error, setError] = useState({ title: "", preview: "", content:"" });
    const [formData, setFormData] = useState({ title: "", previewImage: null, content: "" });
    const [images, setImages] = useState<string[]>([]);

    const handleContentChange = (newContent: string, imageUrl?: string) =>
    {
        if (imageUrl)
        {
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

        if(isError()) return;


        if (!formData.title) {
            setError((prev) => ({ ...prev, title: "Title is required." }));
            return;
        }

        if (!formData.previewImage) {
            setError((prev) => ({ ...prev, preview: "Preview image is required." }));
            return;
        }

        if(!formData.content) {
            setError((prev) => ({ ...prev, content: "Content is required." }));
            return;
        }

        try{
            dispatch(loaderActions.turnOn());
            const imageUrl = await uploadImage();

            const blogmetadata:BlogMetadata = {
                title: formData.title,
                category: BlogType.BLOG,
                userName: user.name,
                createdAt: new Date(),
                userId: user.id,
                imageUrl: imageUrl
            };

            const blogData: BlogData = {
                content: formData.content,
            }

            const blog: Blog = {
                metadata: blogmetadata,
                content: blogData
            }

            const blogActions = new createBlog({blog:blog});
            await blogActions.execute();

            setFormData({ title: "", previewImage: null, content: "" });
        }catch(error) {
            console.error("Error creating blog:", error);
        }finally{
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
            return data.file.url as string;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    }

    const handleTitleChange = (event) => {
        setFormData((prev) => ({ ...prev, title: event.target.value }));

        if(error.title) {setError((prev) => ({ ...prev, title: "" }))}
    }

    return (
        <div className="w-full h-full flex flex-col py-4 px-3 space-y-2">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="text-marrow-dark font-bold">Title</Form.Label>
                    <Form.Control
                        className="rounded-lg text-black font-semibold bg-white"
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
                <Form.Group className="mb-3">
                    <Form.Label className="text-marrow-dark font-bold">Preview Image</Form.Label>
                    <Form.Control
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
                    <Editor value={formData.content} onChange={handleContentChange} />
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