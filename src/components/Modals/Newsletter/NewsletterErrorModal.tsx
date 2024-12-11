import { useAppSelector } from "@/src/context/store/hooks";
import { closeModal } from "@/utils/Modal";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

const NewsletterErrorModal = () =>
{
  const modalProps = useAppSelector((state) => state.modal.props);
  const onClose = () =>
  {
    closeModal();
  };

  return (
    <Modal show={true} size="sm" centered animation keyboard onHide={onClose}>
      <Modal.Header closeButton />
      <Modal.Body className="px-4 py-2 mb-4">
        <div className="w-full flex items-center justify-center mb-4 px-6 py-4">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-8xl"
          />
        </div>
        <div className="text-black text-md font-semibold flex items-center justify-center">
          Error Could Not Send Newsletter!
        </div>
        <div className="text-black text-md font-semibold flex items-center justify-center">
          {modalProps}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewsletterErrorModal;
