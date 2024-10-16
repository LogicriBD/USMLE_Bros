"use client";
import { modalActions } from "@/lib/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Navbar = () =>{

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    return (
        <nav className="bg-white p-3 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="md:max-w-72 max-w-40">
                    <Image
                        src=""
                        alt="Logo"
                        width={50}
                        height={50}
                        layout="responsive"
                    />
                </div>
                <div className="hidden md:flex space-x-6 flex justify-center items-center">
                    <div 
                        onClick={() => dispatch(modalActions.updateModalType(ModalName.Login))}
                        className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2">Login</div>
                    <div className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold text-md rounded-xl px-4 py-2">Register</div>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2 pb-2 space-y-2">
                    <div 
                        onClick={() => dispatch(modalActions.updateModalType(ModalName.Login))}
                        className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-lg px-4 py-2">Login</div>
                    <div className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold text-md rounded-lg px-4 py-2">Register</div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;