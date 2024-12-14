import { useAppSelector } from "@/src/context/store/hooks";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { useNavigate } from "@/src/hooks/useNavigate";
import { closeModal } from "@/utils/Modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

const SuccessContentModal = () =>
{
    const navigate = useNavigate();
    const { selectedCategory } = useCategories();
    const modalData = useAppSelector((state) => state.modal.data);
    const onClose = () =>
    {
        closeModal();
        navigate("/admin/upload");
    }

    return (
        <Modal
            show={true}
            size="sm"
            centered
            animation
            keyboard
            onHide={onClose}
        >
            <Modal.Header closeButton />
            <Modal.Body className="px-4 py-2 mb-4">
                <div className="w-full flex items-center justify-center mb-4 px-6 py-4">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-8xl" />
                </div>
                <div className="text-black text-md font-semibold flex items-center justify-center">Content Successfully {modalData.type} for {selectedCategory?.name}</div>
            </Modal.Body>
        </Modal>
    );
}

export default SuccessContentModal;