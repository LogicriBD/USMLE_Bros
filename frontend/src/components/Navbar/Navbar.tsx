"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarItems from "./NavbarItems";
import { useAppSelector } from "@/src/context/store/hooks";
import { Roles } from "@/utils/enums/Roles";
import AdminNavbarItems from "../AdminNavbar/AdminNavbarItems";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const role = useAppSelector((state) => state.user.role);
    const pathname = usePathname();
    const router = useRouter();

    if (isAuthLoading)
    {
        return (
            <div className="w-full flex flex-row justify-center items-center my-4 px-4 py-2">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <nav className="bg-white p-3 sticky top-0 z-40 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="md:max-w-72 max-w-40 w-[50px] cursor-pointer" onClick={() => router.push("/")}>
                    <Image
                        src="/logos/icon.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                </div>
                {
                    isLoggedIn && role === Roles.Admin && pathname.includes("/admin") && (
                        <div className="text-black text-2xl font-bold">Admin Portal</div>
                    )
                }
                <div className="hidden md:flex space-x-6 flex justify-center items-center">
                    {
                        (isLoggedIn && role === Roles.Admin) ? (
                            <AdminNavbarItems />
                        ) : (
                            <NavbarItems />
                        )
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
                        (isLoggedIn && role === Roles.Admin) ? (
                            <AdminNavbarItems />
                        ) : (
                            <NavbarItems />
                        )
                    }
                </div>
            )}
        </nav>
    );
}

export default Navbar;