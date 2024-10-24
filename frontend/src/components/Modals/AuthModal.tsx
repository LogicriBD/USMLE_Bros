import { useLogin } from "@/src/hooks/useLogin";
import { closeModal } from "@/utils/Modal";
import { Form, Modal } from "react-bootstrap";


const AuthModal = () =>
{
    const { formValues,
        errors,
        submitted,
        handleChange,
        handleSubmit,
        goToRegister } = useLogin();

    return (
        <>
            <Modal
                show={true}
                onHide={closeModal}
                animation
                centered
                keyboard
                className="rounded-xl h-96 w-96"
            >
                <Modal.Body className="p-0 rounded-xl">
                    <div className="flex flex-row w-full h-full min-h-96">
                        <div className="w-1/4 min-h-full bg-indigo-900"></div>
                        <div className="w-3/4 min-h-full bg-gray-100 flex flex-col">
                            <div className="w-full flex items-center justify-center pt-4">
                                <h1 className="text-black font-semibold text-2xl">Login</h1>
                            </div>
                            <div className="w-full flex flex-col p-6 justify-center">
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-black">Email</Form.Label>
                                        <Form.Control
                                            className={`rounded-lg text-black ${submitted && errors.email ? 'is-invalid' : ''}`}
                                            type="email"
                                            name="email"
                                            placeholder="someone@example.com"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-black">Password</Form.Label>
                                        <Form.Control
                                            className={`rounded-lg text-black ${submitted && errors.password ? 'is-invalid' : ''}`}
                                            type="password"
                                            name="password"
                                            placeholder="***********"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-900 text-white rounded-full p-2 hover:bg-indigo-800"
                                    >
                                        Login
                                    </button>
                                    <div className="w-full text-black font-semibold md:text-md flex items-center justify-center">
                                        Don&apos;t have an account? <span
                                            className="text-indigo-900 cursor-pointer ml-1 underline underline-offset-1"
                                            onClick={goToRegister}
                                        >
                                            Sign Up
                                        </span>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AuthModal;
