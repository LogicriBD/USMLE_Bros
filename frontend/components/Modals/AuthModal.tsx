import { modalActions } from "@/lib/store/slices/modal-slice";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ModalName } from "@/utils/enums/ModalEnum";

const AuthModal = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validate = () => {
        let valid = true;
        let emailError = '';
        let passwordError = '';

        if (!formValues.email) {
            emailError = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            emailError = 'Email is invalid';
            valid = false;
        }

        if (!formValues.password) {
            passwordError = 'Password is required';
            valid = false;
        } else if (formValues.password.length < 8) {
            passwordError = 'Password must be at least 8 characters';
            valid = false;
        }

        setErrors({
            email: emailError,
            password: passwordError
        });

        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (validate()) {
            console.log('Form submitted', formValues);
        }
    };

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
                                    <div className="w-full text-black font-semibold text-md flex items-center justify-center">
                                        Don't have an account? <span
                                            className="text-indigo-900 cursor-pointer ml-1 underline underline-offset-1"
                                            onClick={() => dispatch(modalActions.updateModalType(ModalName.SignUp))}
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
