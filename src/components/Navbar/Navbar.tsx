"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarItems from "./NavbarItems";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { Roles } from "@/utils/enums/Roles";
import { usePathname, useRouter } from "next/navigation";
import SpinLoading from "../Spinner";
import Active from "../Active";
import { IoMdMenu } from "react-icons/io";
import NavbarButtons from "./NavbarButtons";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { validateUserSession } from "@/database/config/auth";
import { appStore } from "@/src/context/store/redux-store";


const Navbar = () =>
{
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn) || appStore.getState().auth.isLoggedIn;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const role = useAppSelector((state) => state.user.role);
    const pathname = usePathname();
    const router = useRouter();
    const isAdminPortal = pathname.includes("/admin") && role === Roles.Admin;
    const displayComponent = (<div className="ms-4 text-cyan-300 md:text-2xl text-md font-bold py-2">{isLoggedIn && isAdminPortal ? "USMLE Bros ADMIN" : "USMLE Bros"}</div>);

    if (isAuthLoading)
    {
        return (
            <SpinLoading />
        )
    }

    useEffect(() =>
    {
        validateUserSession();
        setIsOpen(false);
    }, [pathname])

    return (
        <nav className="md:bg-marrow bg-marrow-dark p-3 sticky top-0 shadow-md md:shadow-none" style={{ zIndex: "1021" }}>
            <div className="w-full mx-auto flex justify-between items-center">
                <div className="w-full cursor-pointer flex" >
                    <Image
                        src="/logos/icon.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                        onClick={() => router.push("/")}
                    />
                    {
                        displayComponent
                    }
                    <div className="hidden md:flex space-x-3 text-white flex justify-center items-center">
                        {
                            <NavbarItems />
                        }
                    </div>
                </div>
                <div className="hidden md:flex gap-6 text-white flex justify-center items-center">
                    {user.name && (<Active />)}
                    <div className="flex text-lg font-bold">
                        {user.name}
                    </div>
                    {
                        <NavbarButtons />
                    }
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                        <IoMdMenu className="text-cyan-400 text-2xl" />
                    </button>
                </div>
            </div>
            <div className={`md:hidden overflow-hidden
                                ${isOpen ? " mt-2 p-2 space-y-2 opacity-100 h-auto fixed left-0 w-screen bg-marrow-dark flex justify-center flex-col" : "opacity-0 h-0"} 
                                transform transition-[height,opacity] duration-500 ease-in-out`}>
                {isOpen && (
                    <div className="flex flex-col p-2 m-2 gap-6">
                        <NavbarItems />
                        <NavbarButtons />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;