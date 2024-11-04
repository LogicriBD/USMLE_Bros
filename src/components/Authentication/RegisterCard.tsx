"use client";
import { CardBody, Form } from "react-bootstrap";
import { useRegister } from "@/src/hooks/authentication/useRegister";
import Error from "../Error";
import Loading from "@/src/app/loading";
import { Card, CardFooter } from "../Card";

const RegisterCard = () =>
{

    const { formValues, error, errors, submitted, handleChange, handleSubmit, goToLogin } = useRegister();

    if (submitted)
    {
        return (<Loading />)
    }

    return (
        <Card
            className="rounded-xl h-[550px] md:h-[650px] sm:w-[500px] w-full"
        >
            <Form noValidate onSubmit={handleSubmit}>
                <CardBody className="p-0 rounded-xl h-[350px] sm:h-[400px] md:h-[500px]">
                    <div className="flex flex-row w-full h-[350px] sm:h-[400px] md:h-[500px]">
                        <div className="hidden sm:block sm:w-1/4 bg-marrow rounded-tl-lg"></div>
                        <div className="w-full sm:w-3/4 flex flex-col justify-center items-center">
                            <div className="w-full flex flex-col p-6 justify-center">
                                <Error error={error} />
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-marrow-dark font-bold">Name</Form.Label>
                                    <Form.Control
                                        className={`rounded-lg text-black ${errors.name ? 'is-invalid' : ''}`}
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        disabled={submitted}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-marrow-dark font-bold">Email</Form.Label>
                                    <Form.Control
                                        className={`rounded-lg text-black ${errors.email ? 'is-invalid' : ''}`}
                                        type="email"
                                        name="email"
                                        placeholder="someone@example.com"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        disabled={submitted}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-marrow-dark font-bold">Password</Form.Label>
                                    <Form.Control
                                        className={`rounded-lg text-black ${errors.password ? 'is-invalid' : ''}`}
                                        type="password"
                                        name="password"
                                        placeholder="***********"
                                        value={formValues.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        disabled={submitted}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="text-marrow-dark font-bold">Confirm Password</Form.Label>
                                    <Form.Control
                                        className={`rounded-lg text-black ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="***********"
                                        value={formValues.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                        disabled={submitted}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="w-full flex flex-row h-[200px] sm:h-[150px]">
                    <div className="hidden sm:block sm:w-1/4 bg-marrow rounded-bl-lg"></div>
                    <div className="w-full sm:w-3/4 flex flex-col justify-content-center items-center">
                        <div className="w-full text-marrow-dark font-semibold sm:text-sm flex items-center justify-center mb-4">
                            Already have an account? <span
                                className="text-indigo-900 cursor-pointer ml-1 underline underline-offset-1"
                                onClick={goToLogin}
                            >
                                Log In
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-3/4 bg-marrow text-white rounded-full p-2 hover:bg-marrow-dark mb-4"
                            disabled={submitted}
                        >
                            Sign Up
                        </button>
                    </div>
                </CardFooter>
            </Form>
        </Card>
    );
};

export default RegisterCard;
