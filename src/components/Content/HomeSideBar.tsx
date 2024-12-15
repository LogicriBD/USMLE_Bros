"use client";
import { useEffect, useState } from 'react';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import FilterMobile from './FilterMobile';
import { appStore } from '@/src/context/store/redux-store';
import { loaderActions } from '@/src/context/store/slices/loader-slice';
import AdBanner from '../Ads/AdBanner';

const HomeSideBar = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () =>
    {
        setIsOpen(!isOpen);
    };

    useEffect(() =>
    {
        appStore.dispatch(loaderActions.turnOff())
    }, [])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="hidden tablet:flex flex-col space-y-4 w-full h-full p-4">
                <div className="flex flex-col space-y-4 justify-end">
                    <Filter />
                    <div className='w-full flex items-center justify-center'>
                        <AdBanner
                            dataAdSlot={process.env.DATA_AD_SLOT_DISPLAY_AD}
                            dataAdFormat="auto"
                            dataFullWidthResponsive={true}
                        />
                    </div>
                </div>
            </div>

            <div className="tablet:hidden w-full max-w-16 bg-transparent h-full flex flex-col z-30 relative">
                <div className="w-fit flex justify-end p-2 border border-cyan-300 rounded-full bg-marrow-dark text-cyan-300 my-4 ms-2 text-white cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon
                        icon={faBars}
                    />
                </div>

                <div
                    className={`fixed left-0 w-screen h-full bg-transparent transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300 ease-in-out z-30`}
                >
                    <div className="flex flex-col p-4 space-y-4 h-full bg-marrow-dark">
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
