"use client";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useNavigate } from "../hooks/useNavigate";

const RootPage = () =>
{
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full h-full min-h-full justify-center items-center">
            <div className="w-4/5 h-[650px] mx-4 flex flex-col bg-marrow-light text-white border rounded-lg justify-center items-center">
                <Image src="/logos/icon.png" alt="USMLE Bros Logo" width={192} height={192} />
                <h1 className="text-3xl font-bold text-center mt-4">Welcome to the USMLE Bros!</h1>
                <p className="text-center mt-4">We are a community of medical students and doctors who are dedicated to helping you succeed in your medical career.</p>
                <p className="text-center mt-4">Sign up now to get access to our free resources and study materials!</p>

                <button className="bg-marrow-dark hover:scale-105 text-white font-bold py-2 px-4 rounded my-8" onClick={() => navigate("/home")}>
                    Get Started <FontAwesomeIcon icon={faArrowCircleRight} className="ml-2" />
                </button>
            </div>
            <footer className="fixed bottom-0 w-full bg-marrow-dark text-white font-bold px-4 py-2 flex justify-center items-center">
                Copyright &copy; 2024 USMLE Bros
            </footer>
        </div>
    );
};

export default RootPage;
