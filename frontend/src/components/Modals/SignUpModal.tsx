import { Form, Modal } from "react-bootstrap";
import { useRegister } from "@/src/hooks/useRegister";
import { closeModal } from "@/utils/Modal";
import Error from "../Error";

const SignupModal = () =>
{

    const { formValues, error, errors, submitted, handleChange, handleSubmit, goToLogin } = useRegister();
    return (
        <>
            <Modal
                show={true}
                onHide={closeModal}
                animation
                centered
                keyboard
                className="rounded-xl h-auto w-96"
            >
                <Modal.Body className="p-0 rounded-xl">
                    <div className="flex flex-row w-full h-full min-h-96">
                        <div className="w-1/4 min-h-full bg-indigo-900"></div>
                        <div className="w-3/4 min-h-full bg-gray-100 flex flex-col">
                            <div className="w-full flex items-center justify-center pt-4">
                                <h1 className="text-black font-semibold text-2xl">Sign Up</h1>
                            </div>
                            <div className="w-full flex flex-col p-6 justify-center">
                                <Error error={error} />
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-black">Name</Form.Label>
                                        <Form.Control
                                            className={`rounded-lg text-black ${submitted && errors.name ? 'is-invalid' : ''}`}
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formValues.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

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

                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-black">Confirm Password</Form.Label>
                                        <Form.Control
                                            className={`rounded-lg text-black ${submitted && errors.confirmPassword ? 'is-invalid' : ''}`}
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="***********"
                                            value={formValues.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-900 text-white rounded-full p-2 hover:bg-indigo-800"
                                    >
                                        Sign Up
                                    </button>
                                    <div className="w-full text-black font-semibold text-md flex items-center justify-center">
                                        Already have an account? <span
                                            className="text-indigo-900 cursor-pointer ml-1 underline underline-offset-1"
                                            onClick={goToLogin}
                                        >
                                            Log In
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

export default SignupModal;
