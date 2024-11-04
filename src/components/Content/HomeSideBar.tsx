"use client";
import { useState } from 'react';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import FilterMobile from './FilterMobile';

const HomeSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="hidden md:flex flex-col space-y-4 w-full h-full p-4">
                <div className="flex justify-end">
                    <Filter />
                </div>
            </div>

            <div className="md:hidden block w-full bg-gray-800 h-full flex flex-col z-30 relative">
                <div className="flex justify-end p-4">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={toggleSidebar}
                        className="text-white cursor-pointer"
                    />
                </div>

                <div
                    className={`fixed left-0 w-screen h-full bg-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300 ease-in-out z-30`}
                >
                    <div className="flex flex-col p-4 space-y-4 h-full">
                        <div className='flex justify-between px-2'>
                            <h2 className="text-white font-bold">Menu</h2>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={toggleSidebar}
                                className="text-center text-white cursor-pointer text-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <FilterMobile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSideBar;
