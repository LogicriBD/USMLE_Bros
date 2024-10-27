import { UserDelete } from "@/actions/user/UserDelete";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { closeModal } from "@/utils/Modal";
import { Button, Modal } from "react-bootstrap";

const DeleteUser = () => {
    const user = useAppSelector((state) => state.modal.data);
    const dispatch = useAppDispatch();

    const deleteUser = async () => {
        try{
            dispatch(loaderActions.turnOn());
            const userDeleteAction = new UserDelete({id: user.id});
            await userDeleteAction.execute();
            dispatch(submitActions.toggleSubmit());
        }catch(error:any){
            console.error(error);
        }finally{
            dispatch(loaderActions.turnOff());
            closeModal();
        }
    }

    return (
        <Modal
            show={true}
            onHide={() => closeModal()}
            animation
            centered
            keyboard
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-black font-bold text-2xl">Switch User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col">
                    <p className="text-black text-lg">Are you sure you want to Delete &apos;{user.name}&apos;?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <button
                    onClick={deleteUser}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >Delete</button>
            </Modal.Footer>
        </Modal>
    );
}
export default DeleteUser;