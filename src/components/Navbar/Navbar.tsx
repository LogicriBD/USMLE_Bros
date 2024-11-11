"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarItems from "./NavbarItems";
import { useAppSelector } from "@/src/context/store/hooks";
import { Roles } from "@/utils/enums/Roles";
import { usePathname, useRouter } from "next/navigation";
import SpinLoading from "../Spinner";
import Active from "../Active";
import { IoMdMenu } from "react-icons/io";
import NavbarButtons from "./NavbarButtons";
import { validateUserSession } from "@/database/config/auth";
import { appStore } from "@/src/context/store/redux-store";


const Navbar = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn) || appStore.getState().auth.isLoggedIn;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const role = useAppSelector((state) => state.user.role);
    const pathname = usePathname();
    const router = useRouter();
    const isAdminPortal = pathname.includes("/admin") && role === Roles.Admin;
    const displayComponent = (<div className="mx-4 cursor-pointer text-cyan-300 tablet:text-2xl text-md font-bold py-2" onClick={() => router.push("/")}>{isLoggedIn && isAdminPortal ? "USMLE Bros ADMIN" : "USMLE Bros"}</div>);

    useEffect(() =>
    {
        validateUserSession();
        setIsOpen(false);
    }, [pathname])

    if (isAuthLoading)
    {
        return (
            <SpinLoading />
        )
    }



    return (
        <nav className="md:bg-marrow bg-marrow-dark p-3 md:max-h-full max-h-[70px] w-full top-0 shadow-md md:shadow-none" style={{ zIndex: "1021" }}>
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
                    <div className="hidden md:flex space-x-3 text-white flex justify-center items-center">
                        {
                            <NavbarItems />
                        }
                    </div>
                </div>
                <div className="hidden w-1/4 md:flex md:flex-grow gap-6 text-white justify-center items-center">
                    {user.name && (<Active />)}
                    <div className="flex w-fit flex-grow tablet:text-lg text-sm font-bold">
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
                                ${isOpen ? " p-2 space-y-2 opacity-100 h-auto fixed left-0 w-screen bg-marrow-dark flex justify-center flex-col" : "opacity-0 h-0"} 
                                transform transition-[height,opacity] duration-500 ease-in-out`} style={{ zIndex: "1021" }}>
                {isOpen && (
                    <div className="flex flex-col p-2 m-2 gap-6">
                        <NavbarItems />
                        <div className="w-full flex flex-row gap-3">
                            <div className="rounded-full">
                                {user.name && (<Active />)}
                            </div>
                            <div className="flex text-lg font-bold text-white pb-2">
                                {user.name}
                            </div>
                        </div>
                        <NavbarButtons />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;