import { modalActions } from "@/lib/store/slices/modal-slice";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SignupModal = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        let nameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';

        if (!formValues.name) {
            nameError = 'Name is required';
            valid = false;
        }

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

        if (!formValues.confirmPassword) {
            confirmPasswordError = 'Please confirm your password';
            valid = false;
        } else if (formValues.confirmPassword !== formValues.password) {
            confirmPasswordError = 'Passwords do not match';
            valid = false;
        }

        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
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
