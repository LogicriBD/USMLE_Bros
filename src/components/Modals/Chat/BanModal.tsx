import { BanUser } from "@/actions/user/BanUser";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { logger } from "@/utils/Logger";
import { closeModal } from "@/utils/Modal";
import { BanEnum } from "@/utils/enums/Ban";
import { Modal } from "react-bootstrap";

const BanModal = () => {
    const data = useAppSelector((state) => state.modal.data);
    const dispatch = useAppDispatch();

    const handleBan = async (ban:BanEnum) => {
        try{
            dispatch(loaderActions.turnOn());
            const banAction = new BanUser(data.id, ban);
            await banAction.execute();
            dispatch(submitActions.toggleSubmit())
        }catch(error: any){
            logger.error(error);
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
                <Modal.Title className="text-black font-bold text-2xl">Ban User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col">
                    <p className="text-black text-lg">Are you sure you want to Ban &apos;{data.name}&apos;?</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => handleBan(BanEnum.OneDay)}
                    className="bg-sky-600 text-white p-2 rounded-md hover:bg-sky-800 transition duration-300"
                >24 hr Ban</button>
                <button
                    onClick={() => handleBan(BanEnum.Permanent)}
                    className="bg-marrow text-white p-2 rounded-md hover:bg-marrow-dark transition duration-300"
                >Ban Entirely</button>
            </Modal.Footer>
        </Modal>
    );
}
export default BanModal;