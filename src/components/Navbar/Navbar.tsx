"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarItems from "./NavbarItems";
import { useAppSelector } from "@/src/context/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import SpinLoading from "../Spinner";
import Active from "../Active";
import { IoMdMenu } from "react-icons/io";
import NavbarButtons from "./NavbarButtons";
import { validateUserSession } from "@/database/config/auth";


const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const pathname = usePathname();
    const router = useRouter();

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
        <nav className="tablet:bg-marrow bg-marrow-dark p-3 tablet:max-h-full max-h-[70px] w-full top-0 shadow-md tablet:shadow-none" style={{ zIndex: "1021" }}>
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
                    <div className="hidden tablet:flex space-x-3 text-white justify-center items-center">
                        {
                            <NavbarItems />
                        }
                    </div>
                </div>
                <div className="hidden w-1/4 tablet:flex tablet:flex-grow gap-6 text-white justify-center items-center">
                    {user.name && (<Active />)}
                    <div className="flex w-fit flex-grow tablet:text-lg text-sm font-bold">
                        {user.name}
                    </div>
                    {
                        <NavbarButtons />
                    }
                </div>
                <div className="tablet:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                        <IoMdMenu className="text-cyan-400 text-2xl" />
                    </button>
                </div>
            </div>
            <div className={`tablet:hidden overflow-hidden
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
                                {user.name.length > 8 ? user.name.substring(0, 5) + "..." : user.name}
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