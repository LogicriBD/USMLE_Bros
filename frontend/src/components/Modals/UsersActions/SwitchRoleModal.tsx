import { UserChangeRole } from "@/actions/user/UserChangeRole";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";
import { closeModal } from "@/utils/Modal";
import { Roles } from "@/utils/enums/Roles";
import { Button, Modal } from "react-bootstrap"

const SwitchRoleModal = () => {

    const user = useAppSelector((state) => state.modal.data);
    const dispatch = useAppDispatch();
    const newRole = () => {
        return user.role === Roles.Admin ? Roles.User : Roles.Admin;
    }

    const changeRole = async() => {
        try{
            dispatch(loaderActions.turnOn());
            const role = newRole();
            const userAction = new UserChangeRole({id:user.id, role:role});
            await userAction.execute();
            dispatch(submitActions.toggleSubmit());
        }catch(error: any){
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
                    <p className="text-black text-lg">Are you sure you want to switch {user.name}&apos;s role to {newRole()}?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <button 
                    onClick={changeRole}
                    className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >Switch</button>
            </Modal.Footer>
        </Modal>
    )
}

export default withAdminPriviledges(SwitchRoleModal);