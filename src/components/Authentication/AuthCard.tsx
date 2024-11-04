"use client";
import { useLogin } from "@/src/hooks/authentication/useLogin";
import { CardBody, Form } from "react-bootstrap";
import Error from "../Error";
import Loading from "@/src/app/loading";
import { Card, CardFooter } from "../Card";


const AuthCard = () =>
{
    const { formValues,
        error,
        errors,
        submitted,
        handleChange,
        handleSubmit,
        goToRegister } = useLogin();

    if (submitted)
    {
        return (<Loading />);
    }

    return (
        <Card
            className="h-[450px] sm:w-[500px] w-full"
        >
            <Form noValidate onSubmit={handleSubmit}>
                <CardBody className="p-0 rounded-xl h-[300px]">
                    <div className="flex flex-row w-full h-[300px]">
                        <div className="hidden sm:block sm:w-1/4 bg-marrow rounded-tl-lg"></div>
                        <div className="w-full sm:w-3/4 flex flex-col justify-center items-center">
                            <div className="w-full flex flex-col p-6 justify-center">
                                <Error error={error} />
                                <Form.Group className="mb-12">
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

                                <Form.Group className="mb-6">
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
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="w-full flex flex-row h-[150px] mb:6">
                    <div className="hidden sm:block sm:w-1/4 bg-marrow rounded-bl-lg"></div>
                    <div className="w-full sm:w-3/4 flex flex-col justify-content-center items-center">
                        <div className="w-full text-marrow-dark font-semibold sm:text-sm flex items-center justify-center mb-4">
                            Don&apos;t have an account? <span
                                className="text-indigo-900 cursor-pointer ml-1 underline underline-offset-1"
                                onClick={goToRegister}
                            >
                                Sign Up
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-3/4 bg-marrow text-white rounded-full p-2 hover:bg-marrow-dark mb-6"
                            disabled={submitted}
                        >
                            Login
                        </button>
                    </div>
                </CardFooter>
            </Form>
        </Card>
    );
};

export default AuthCard;
