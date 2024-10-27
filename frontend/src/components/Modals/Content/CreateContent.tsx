"use client"
import { Modal } from "react-bootstrap";
import MyJoditEditor from "../../Upload/Editor/JoditEditor";
import { useState } from "react";
import { closeModal } from "@/utils/Modal";
import { useAppSelector } from "@/src/context/store/hooks";

const CreateContent = () => {
    const [content, setContent] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(true);

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleClose = () => {
        setShowModal(false);
        setContent("");
        closeModal();
    };

    // const handleSubmit = () => {
    //     try{

    //     }
    // }

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
                <button className="p-2 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-900 transition duration-300">Submit</button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateContent;
