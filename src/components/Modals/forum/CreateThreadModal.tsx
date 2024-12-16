import { CreateThread } from "@/actions/forum/CreateThread";
import { ThreadType } from "@/database/repository/Thread";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { logger } from "@/utils/Logger";
import { closeModal } from "@/utils/Modal";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CreateThreadModal = () =>
{

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const dispatch = useAppDispatch();

    const data = useAppSelector((state) => state.modal.data);
    const user = useAppSelector((state) => state.user);

    const handleSubmit = async () =>
    {
        try
        {
            if (name === "")
            {
                return;
            }
            dispatch(loaderActions.turnOn());

            const thread: ThreadType = {
                title: name,
                description: description ?? "",
                topicId: data.topicId,
                createdBy: user.name,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const threadActions = new CreateThread({ thread: thread });
            await threadActions.execute();
            dispatch(submitActions.toggleSubmit())
        } catch (error)
        {
            logger.log(error);
        } finally
        {
            dispatch(loaderActions.turnOff());
            closeModal();
        }
    }

    return (
        <Modal
            show={true}
            onHide={() => { closeModal() }}
            centered
            keyboard
            animation
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Thread</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full flex flex-col space-y-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md text-black"
                        placeholder="Enter Discussion Title"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md text-black"
                        placeholder="Enter Description"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >Save</button>
            </Modal.Footer>
        </Modal>
    );

}

export default CreateThreadModal;