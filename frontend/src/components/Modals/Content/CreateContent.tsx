"use client"
import { Modal } from "react-bootstrap";
import MyJoditEditor from "../../Upload/Editor/JoditEditor";
import { useState } from "react";
import { closeModal } from "@/utils/Modal";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { Content, ContentData, ContentMetaData } from "@/database/repository/Content";
import { ContentCreate } from "@/actions/content/ContentCreate";
import { logger } from "@/utils/Logger";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";

const CreateContent = () => {

    const dispatch = useAppDispatch();

    const [content, setContent] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const user = useAppSelector((state) => state.user);
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleClose = () => {
        setShowModal(false);
        setContent("");
        closeModal();
    };

    const handleSubmit = async () => {
        try{
            if(title === ""){
                setError("Title is required");
                return;
            }

            dispatch(loaderActions.turnOn());

            setError(undefined);

            if(selectedCategory){
                const metadata: ContentMetaData ={
                    title: title,
                    categoryId: selectedCategory.id,
                    userName: user.name,
                    createdAt: new Date(),
                    userId: user.id
                } 

                const contentdata: ContentData = {
                    content: content
                }

                const C:Content = {
                    metadata: metadata,
                    content: contentdata
                }

                const contentAction = new ContentCreate({content: C});
                await contentAction.execute();
                dispatch(submitActions.toggleSubmit());
            }
        }catch(error){
            logger.error(error);
        }finally{
            dispatch(loaderActions.turnOff());
            closeModal();
        }
    }

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
                <Modal.Title className="text-black bg-inherit">New Content {selectedCategory && (`for ${selectedCategory.name}`)}</Modal.Title>
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
                    {showModal && ( // Conditionally render editor to unmount cleanly
                        <MyJoditEditor value={content} onChange={handleContentChange} />
                    )}
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
