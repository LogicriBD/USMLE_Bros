import { CreateTopic } from "@/actions/forum/CreateTopic";
import { TopicType } from "@/database/repository/Topic";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { closeModal } from "@/utils/Modal";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CreateModal = () => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const data = useAppSelector((state) => state.modal.data);
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try{
            if(name === "" || description === ""){
                return;
            }
            dispatch(loaderActions.turnOn());
            const topic: TopicType = {
                title: name,
                parentId: data.parentId ? data.parentId : "",
                level: data.level ? data.level : 0,
                description: description
            }
            const topicActions = new CreateTopic({topic:topic});
            await topicActions.execute();
            dispatch(submitActions.toggleSubmit())
        }catch(error){
            console.log(error);
        }finally{
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
                <Modal.Title>Create New {data.level === 2 ?  "Sub Topic" : "Discussion"} {data.parentId && "Under This"}</Modal.Title>
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

export default CreateModal;