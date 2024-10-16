import { modalActions } from "@/lib/store/slices/modal-slice";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const AuthModal = () => {
    const dispatch = useDispatch();
    const handleSubmit = () => {
        console.log("Submitted");
    }
    return (
        <>
            <Modal
                show={true}
                onHide={() => dispatch(modalActions.removeModal())}
                animation
                centered
                keyboard
                className="rounded-xl h-96 w-96"
            >
                <Modal.Body
                    className="p-0 rounded-xl"
                >
                    <div className=" flex flex-row w-full h-full min-h-96">
                        <div className="w-1/4 min-h-full bg-indigo-900">

                        </div>
                        <div className="w-3/4 min-h-full bg-gray-100 flex flex-col">
                            <div className="w-full flex items-center justify-center pt-4">
                                <h1 className="text-black font-semibold text-2xl">Login</h1>
                            </div>
                            <div className="w-full flex flex-col p-6 justify-center">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label className="text-black">Email</Form.Label>
                                        <Form.Control 
                                            className="rounded-lg text-black"
                                            type="email" 
                                            placeholder="someone@example.com" 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="text-black">Password</Form.Label>
                                        <Form.Control 
                                            className="rounded-lg text-black"
                                            type="password" 
                                            placeholder="***********" 
                                        />
                                    </Form.Group>
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-900 text-white rounded-full p-2 hover:bg-indigo-800"
                                    >
                                        Login
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;