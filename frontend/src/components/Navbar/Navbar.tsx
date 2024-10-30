"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarItems from "./NavbarItems";
import { useAppSelector } from "@/src/context/store/hooks";
import { Roles } from "@/utils/enums/Roles";
import { usePathname, useRouter } from "next/navigation";
import SpinLoading from "../Spinner";
import Active from "../Active";
const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const role = useAppSelector((state) => state.user.role);
    const pathname = usePathname();
    const router = useRouter();
    const isAdminPortal = pathname.includes("/admin") && role === Roles.Admin;

    if (isAuthLoading)
    {
        return (
            <SpinLoading />
        )
    }

    return (
        <nav className="bg-white p-3 sticky top-0 z-40 shadow-md">
            <div className="w-full mx-auto flex justify-between items-center">
                <div className="md:max-w-72 max-w-40 w-full cursor-pointer flex" onClick={() => router.push("/")}>
                    <Image
                        src="/logos/icon.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    {
                        isLoggedIn && isAdminPortal && (
                            <div className="ms-4 text-black text-2xl font-bold py-2">Admin Portal</div>
                        )
                    }
                </div>
                <div className="hidden md:flex space-x-3 flex justify-center items-center">
                    {user.name && (<Active />)}
                    <div className="flex">
                        {user.name}
                    </div>
                    {
                        <NavbarItems />
                    }
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
                    {
                        <NavbarItems />
                    }
                </div>
            )}
        </nav>
    );
}

export default Navbar;