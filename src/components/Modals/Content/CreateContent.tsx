"use client"
import { Modal } from "react-bootstrap";
import Editor from "../../Upload/Editor";
import { useEffect, useState } from "react";
import { closeModal } from "@/utils/Modal";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { Content, ContentData, ContentMetaData } from "@/database/repository/Content";
import { ContentCreate } from "@/actions/content/ContentCreate";
import { logger } from "@/utils/Logger";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { extractFirstH1, splitContentByH1Sections } from "@/utils/helpers/ContentParser";
import SpinLoading from "../../Spinner";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentDeleteById } from "@/actions/content/ContentDeleteById";


const LoadableEditor = ({ loading, content, handleContentChange }: {
    loading: boolean;
    content: string;
    handleContentChange: (newContent: string, imageUrl?: string) => void;
}) =>
{

    if (loading)
    {
        return (
            <SpinLoading />
        )
    }

    return (
        <Editor value={content} onChange={handleContentChange} />
    )
}

const CreateContent = () =>
{

    const dispatch = useAppDispatch();
    const modalData = useAppSelector((state) => state.modal.data);
    const [content, setContent] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");
    const [images, setImages] = useState<string[]>([]);
    const [contentHeader, setContentHeader] = useState<string>("");
    const [previousContent, setPreviousContent] = useState<ContentData[]>([]);
    const [loading, setLoading] = useState(false);

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const user = useAppSelector((state) => state.user);
    const handleContentChange = (newContent: string, imageUrl?: string) =>
    {
        setContent(newContent);
        if (imageUrl)
        {
            setImages((prev) => [...prev, imageUrl])
        }
    };

    const handleClose = () =>
    {
        setShowModal(false);
        setContent("");
        closeModal();
    };

    const fetchContent = async (metadataId: string) =>
    {
        try
        {
            const contentByMetadataIdAction = new ContentsFetchById({ metadataId: metadataId, all: true });
            const contents = await contentByMetadataIdAction.execute();
            const sortedContents = contents.sort((a, b) => a.serialNumber - b.serialNumber);
            setPreviousContent(sortedContents);
            const content = sortedContents.map((content) => content.content).join("\n");
            setContent(content);
            setLoading(false);
        }
        catch (err: any)
        {
            logger.error(err);
            setError(err.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    const handleSubmit = async () =>
    {
        if (title === "")
        {
            setError("Title is required");
            return;
        }
        try
        {
            dispatch(loaderActions.turnOn());

            setError(undefined);

            if (selectedCategory)
            {
                const contentSections = splitContentByH1Sections(content);
                const sections = contentSections.map((content) =>
                {
                    const section = extractFirstH1(content);
                    if (section)
                    {
                        return section
                    }
                    else
                    {
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
                if (images.length > 0)
                {
                    metadata.imageUrl = images[0];
                }
                if (filterNullSections.length > 0)
                {
                    metadata.sections = filterNullSections.filter(section => section !== null) as string[];
                }

                const contentdata: ContentData[] = contentSections.map((section, index) =>
                {
                    if (index < previousContent.length)
                    {
                        return {
                            content: section,
                            isLocked: previousContent[index].isLocked,
                            serialNumber: index,
                        }
                    }
                    else
                    {
                        return {
                            content: section,
                            isLocked: false,
                            serialNumber: index
                        }
                    }
                });

                const formattedContent: Content = {
                    metadata: metadata,
                    content: contentdata
                }
                if (!!modalData)
                {
                    const contentDeleteAction = new ContentDeleteById({ id: modalData.id });
                    await contentDeleteAction.execute();
                }
                const contentAction = new ContentCreate({ content: formattedContent });
                await contentAction.execute();
                dispatch(submitActions.toggleSubmit());
            }
        } catch (error)
        {
            logger.error(error);
        } finally
        {
            dispatch(loaderActions.turnOff());
            closeModal();
        }
    }

    useEffect(() =>
    {
        console.log(modalData);
        if (!!modalData)
        {
            setContentHeader(modalData.title);
            setTitle(modalData.title);
            setLoading(true);
            fetchContent(modalData.id);
        }
        else
        {
            setContentHeader(`New Content ${selectedCategory && (`for ${selectedCategory.name}`)}`)
        }
    }, [modalData, selectedCategory])

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
                    <LoadableEditor loading={loading} content={content} handleContentChange={handleContentChange} />
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
