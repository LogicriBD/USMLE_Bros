"use client";
import { Roles } from "@/utils/enums/Roles"
import { Form } from "react-bootstrap"
import CustomEditor from "../Upload/CustomEditor"
import { useRef, useState } from "react";
import { routes } from "@/src/api/Routes";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "../../../utils/Logger";

const NewsLetterUploader = () =>
{

    const editorRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({ subject: "", receiver: "All", content: "" });
    const [error, setError] = useState({ subject: "", receiver: "", content: "" });

    const isError = () =>
    {
        return !!error.subject || !!error.receiver || !!error.content;
    }
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (isError()) return;
        if (!formData.subject)
        {
            setError((prev) => ({ ...prev, subject: "Subject is required." }));
            return;
        }
        if (!formData.content)
        {
            setError((prev) => ({ ...prev, content: "Content is required." }));
            return;
        }
        logger.log(formData);
        try
        {
            dispatch(loaderActions.turnOn());
            const newContent = await uploadAndReplaceImageSrc();
            console.log(newContent)
            setFormData((prev) => ({ ...prev, content: newContent }));

            const response = await fetch(routes.mail.send, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok)
            {
                logger.log("Newsletter sent successfully:", data.message);
            }
            else
            {
                throw new Error(data.message);
            }
        } catch (error)
        {
            logger.error("Error creating blog:", error);
        } finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    const handleContentChange = (newContent: string) =>
    {
        setFormData((prev) => ({ ...prev, content: newContent }));
    };

    const uploadAndReplaceImageSrc = async () =>
    {
        const parser = new DOMParser();
        const doc = parser.parseFromString(formData.content, 'text/html');
        const imgTags = Array.from(doc.querySelectorAll('img'));

        for (const imgTag of imgTags)
        {
            const src = imgTag.getAttribute('src');
            if (src)
            {
                const file = await fetch(src).then((r) => r.blob());
                const formData = new FormData();
                formData.append('file', file);

                try
                {
                    const response = await fetch(routes.content.upload, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    logger.log("Image Uploaded:", data.file.url);
                    imgTag.setAttribute('src', data.file.url);
                } catch (error)
                {
                    logger.error('Error uploading image:', error);
                }
            }
        }

        formData.content = doc.body.innerHTML;
        return formData.content;
    };

    return (
        <div className="w-full h-full flex flex-col">
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between space-x-2">
                    <Form.Group className="mb-3 w-5/6">
                        <Form.Label className="text-marrow-dark font-bold">Subject</Form.Label>
                        <Form.Control
                            className="rounded-lg w-full text-black font-semibold bg-white"
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Set a subject for newsletter..."
                            isInvalid={!!error.subject}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error.subject}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 w-1/6">
                        <Form.Label className="text-marrow-dark font-bold">Receiver</Form.Label>
                        <Form.Select
                            className="rounded-lg text-black font-semibold bg-white"
                            name="receiver"
                            value={formData.receiver}
                            onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                            isInvalid={!!error.receiver}
                        >
                            <option value={"All"}>All</option>
                            <option value={Roles.User}>Users</option>
                            <option value={Roles.Admin}>Admins</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {error.receiver}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3 h-fit">
                    <Form.Label className="text-marrow-dark font-bold">Content</Form.Label>
                    <CustomEditor
                        ref={editorRef}
                        value={formData.content}
                        onChange={handleContentChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error.content}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 flex justify-end">
                    <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-marrow-dark text-white font-semibold">
                        Send
                    </button>
                </Form.Group>
            </Form>
        </div>
    )
};

export default NewsLetterUploader;