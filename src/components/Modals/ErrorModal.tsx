import { useAppSelector } from "@/src/context/store/hooks";
import { closeModal } from "@/utils/Modal";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

const ErrorModal = () => {

    const data = useAppSelector((state) => state.modal.data);

    return (
        <Modal
            show={true}
            size="sm"
            centered
            animation
            keyboard
            onHide={() => {closeModal()}}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-black bg-inherit">
                    Error <FontAwesomeIcon icon={faExclamation} className="ml-2 text-lg text-red-500" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-black text-md font-semibold flex items-center justify-center">There was a problem processing the request: {data}</div>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    onClick={() => {closeModal()}}
                    className="p-2 rounded-md font-semibold text-white bg-gray-600 hover:bg-gray-900 transition duration-300">Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal;