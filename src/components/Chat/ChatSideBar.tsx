"use client";
import { useAppSelector } from "@/src/context/store/hooks";
import UserCard from "./UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SideBarContents = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <>
            <div className="w-full p-2 items-center text-white md:text-xl text-lg font-bold">
                People
            </div>
            <div className="w-full h-full p-2 flex flex-col space-y-2 overflow-y-auto">
                <UserCard user={user} isActive={true} />
                <UserCard user={user} isActive={true} />
                <UserCard user={user} isActive={true} />
            </div>
        </>
    )
}

const ChatSideBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="hidden w-full h-full bg-opacity-10 bg-gray-100 lg:flex lg:flex-col">
                <SideBarContents />
            </div>
            <div className="lg:hidden bg-marrow-dark block w-full h-full flex flex-col z-30 relative">
                <div className="flex justify-end p-4">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={toggleSidebar}
                        className="text-white cursor-pointer"
                    />
                </div>

                <div
                    className={`fixed left-0 w-screen h-full bg-marrow-dark transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300 ease-in-out z-30`}
                >
                    <div className="flex flex-col p-4 space-y-4 h-full">
                        <div className='flex justify-end px-2'>

                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={toggleSidebar}
                                className="text-center text-white cursor-pointer text-xl"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <SideBarContents />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatSideBar;