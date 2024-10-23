"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarItems from "./NavbarItems";
const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-white p-3 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="md:max-w-72 max-w-40 w-[50px]">
                    <Image
                        src="/logos/icon.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="hidden md:flex space-x-6 flex justify-center items-center">
                    <NavbarItems />
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
                    <NavbarItems />
                </div>
            )}
        </nav>
    );
}

export default Navbar;