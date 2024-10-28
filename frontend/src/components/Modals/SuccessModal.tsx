import { closeModal } from "@/utils/Modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

const SuccessModal = () =>
{

    return (
        <Modal
            show={true}
            size="sm"
            centered
            animation
            keyboard
            onHide={() => { closeModal() }}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-black bg-inherit">
                    Success <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-lg text-red-500" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-black text-md font-semibold flex items-center justify-center">You have successfully logged in to USMLE bros!</div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={() => { closeModal() }}
                    className="p-2 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-900 transition duration-300">Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;