import { CategoryCreate } from "@/actions/category/CategoryCreate";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";
import { logger } from "@/utils/Logger";
import { closeModal } from "@/utils/Modal";
import { ModalName } from "@/utils/enums/ModalEnum";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CreateCategory = () =>
{

    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>("");

    const handleSubmit = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const categoryAction = new CategoryCreate({ name: name });
            await categoryAction.execute();
            dispatch(submitActions.toggleSubmit());
        } catch (error)
        {
            logger.error(error);
            dispatch(modalActions.addModal({ type: ModalName.ErrorModal, data: error }));
        }
        finally
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
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md text-black"
                    placeholder="Enter Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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

export default withAdminPriviledges(CreateCategory);