"use client";
import { useState } from 'react';
import Filter from './Filter';
import RecentPosts from './RecentContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HomeSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="hidden md:flex flex-col space-y-4 w-full h-full p-4">
                <div className='flex justify-end'>
                    <Filter />
                </div>
            </div>
            <div className="md:hidden block w-full bg-gray-800 h-full flex flex-col z-20">
                {isOpen ? (
                    <div
                        className={`flex flex-col space-y-4 w-screen h-full p-4 bg-gray-800 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-white font-bold">Menu</h2>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={toggleSidebar}
                                className="text-white cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-end">
                                <Filter />
                            </div>
                            <div className="flex justify-end">
                                <RecentPosts />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end p-4 h-full">
                        <FontAwesomeIcon
                            icon={faBars}
                            onClick={toggleSidebar}
                            className="text-white cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </div>
    )
};

export default HomeSideBar;
