"use client";
import { useLogin } from "@/src/hooks/authentication/useLogin";
import Error from "../Error";
import Loading from "@/src/app/loading";
import { Modal } from "react-bootstrap";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const AuthModal = () =>
{
    const {
        error,
        submitted,
        handleGoogleSignIn } = useLogin();
    const dispatch = useAppDispatch();

    if (submitted)
    {
        return (<Loading />);
    }

    return (
        <Modal
            show={true}
            size="lg"
            centered
            animation
            keyboard
            onHide={() => dispatch(modalActions.removeModal())}
            className="rounded-xl"

        >
            <Modal.Body className="p-0 rounded-xl overflow-y-auto">
                <div className="flex flex-row w-full">
                    <div className="hidden sm:block sm:w-1/4 bg-marrow rounded-tl-lg"></div>
                    <div className="w-full sm:w-3/4 flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col p-6 justify-center">
                            <Error error={error} />
                        </div>
                        <div className="w-full">
                            <Image src={'/images/people.jpg'} alt="People" width={1000} height={1000} />
                        </div>
                        <button
                            type="button"
                            className="w-3/4 bg-marrow text-white rounded-full p-2 hover:bg-marrow-dark mb-6"
                            disabled={submitted}
                            onClick={() => handleGoogleSignIn()}
                        >
                            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                            Sign In With Google
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
