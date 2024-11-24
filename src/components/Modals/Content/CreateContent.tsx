"use client"
import { Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { closeModal } from "@/utils/Modal";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { Content, ContentData, ContentMetaData } from "@/database/repository/Content";
import { ContentCreate } from "@/actions/content/ContentCreate";
import { logger } from "@/utils/Logger";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { extractFirstH1, splitContentByH1Sections } from "@/utils/helpers/ContentParser";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentDeleteById } from "@/actions/content/ContentDeleteById";
import CustomEditor from "../../Upload/CustomEditor";
import { routes } from "@/src/api/Routes";

const CreateContent = () => {
    const editorRef = useRef<any>(null);

    const dispatch = useAppDispatch();
    const modalData = useAppSelector((state) => state.modal.data);
    const [content, setContent] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");
    const [contentHeader, setContentHeader] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const user = useAppSelector((state) => state.user);
    const handleClose = () => {
        setShowModal(false);
        setContent("");
        closeModal();
    };

    const fetchContent = async (metadataId: string) => {
        try {
            const contentByMetadataIdAction = new ContentsFetchById({ metadataId: metadataId, all: true });
            const contents = await contentByMetadataIdAction.execute();
            const sortedContents = contents.sort((a, b) => a.serialNumber - b.serialNumber);
            const content = sortedContents.map((content) => content.content).join("\n");
            setContent(content);
            setLoading(false);
        }
        catch (err: any) {
            logger.error(err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const uploadAndReplaceImageSrc = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const imgTags = Array.from(doc.querySelectorAll('img'));
        let metadataImageUrl = "";
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
                    if (imgTags.indexOf(imgTag) === 0) {
                        metadataImageUrl = data.file.url;
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }
        const newContent = doc.body.innerHTML;
        return {newContent, metadataImageUrl};
    };

    const handleSubmit = async () => {
        if (title === "") {
            setError("Title is required");
            return;
        }
        try {
            dispatch(loaderActions.turnOn());

            setError(undefined);

            if (selectedCategory) {
                const {newContent, metadataImageUrl} = await uploadAndReplaceImageSrc();
                const contentSections = splitContentByH1Sections(newContent);
                const sections = contentSections.map((newContent) => {
                    const section = extractFirstH1(newContent);
                    if (section) {
                        return section
                    }
                    else {
                        return null;
                    }
                })
                const filterNullSections = sections.filter((section) => section !== null);

                const metadata: ContentMetaData = {
                    title: title,
                    categoryId: selectedCategory.id,
                    userName: user.name,
                    createdAt: new Date(),
                    userId: user.id
                }
                if (metadataImageUrl !== "") {
                    metadata.imageUrl = metadataImageUrl;
                }
                if (filterNullSections.length > 0) {
                    metadata.sections = filterNullSections.filter(section => section !== null) as string[];
                }

                const contentdata: ContentData[] = contentSections.map((section, index) => (
                    {
                        content: section,
                        isLocked: index === 0 ? false : true,
                        serialNumber: index
                    }
                ));

                const formattedContent: Content = {
                    metadata: metadata,
                    content: contentdata
                }
                if (!!modalData) {
                    const contentDeleteAction = new ContentDeleteById({ id: modalData.id });
                    await contentDeleteAction.execute();
                }
                const contentAction = new ContentCreate({ content: formattedContent });
                await contentAction.execute();
                console.log(metadata)
                dispatch(submitActions.toggleSubmit());
                if (editorRef.current) {
                    editorRef.current.clearContents();
                }
            }
        } catch (error) {
            logger.error(error);
        } finally {
            dispatch(loaderActions.turnOff());
            closeModal();
        }
    }

    useEffect(() => {
        console.log(modalData);
        if (!!modalData) {
            setContentHeader(modalData.title);
            setTitle(modalData.title);
            setLoading(true);
            fetchContent(modalData.id);
        }
        else {
            setContentHeader(`New Content ${selectedCategory && (`for ${selectedCategory.name}`)}`)
        }
    }, [modalData, selectedCategory]);

    return (
        <Modal
            show={showModal}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            centered
            animation
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-black bg-inherit">{contentHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full py-2">
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-2 px-3 text-black font-semibold bg-gray-100 rounded-md border border-gray-600 focus:border-gray-800 focus:outline-none"
                        placeholder="Title"
                    />
                    {error && (<div className="text-red-500 font-normal text-sm px-2">{error}</div>)}
                </div>
                <div className="w-full">
                    <CustomEditor ref={editorRef} value={content} onChange={setContent} />
                </div>
            </Modal.Body>
            <Modal.Footer
                className="p-2">
                <button
                    onClick={handleClose}
                    className="p-2 rounded-md font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 transition duration-300">Close</button>
                <button
                    onClick={handleSubmit}
                    className="p-2 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-900 transition duration-300">Submit</button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateContent;
