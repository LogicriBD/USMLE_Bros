"use client";
import { faCaretDown, faCaretUp, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { categoryActions } from "@/src/context/store/slices/category-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import SpinLoading from "../Spinner";

const SideBar = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();
    const callback = () =>
    {
        dispatch(categoryActions.setSelectedCategory(null));
    }
    const { categories, selectedCategory, loading } = useCategories([], callback);

    if (loading)
    {
        return (
            <div className="md:w-64 w-full bg-gray-800 text-white md:min-h-screen min-h-0">
                <SpinLoading invert />
            </div>
        )
    }

    return (
        <div className="md:w-64 w-full bg-gray-800 text-white md:min-h-screen min-h-0">
            <div className="px-6 py-3 font-bold text-xl border-b border-gray-700 flex justify-between">
                Categories

                <span className="md:hidden text-white cursor-pointer">
                    {isOpen ? (
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    )}
                </span>
            </div>

            <ul
                className={`${isOpen ? "scale-y-100 max-h-screen" : "scale-y-0 max-h-0 md:scale-y-100 md:max-h-screen"} 
                transform transition-all duration-500 ease-in-out origin-top overflow-hidden mb-0`}
            >
                <li className="border-b border-gray-700">
                    <button
                        onClick={() =>
                        {
                            dispatch(modalActions.updateModalType(ModalName.CreateCategory));
                            setIsOpen(false);
                        }}
                        className="p-2 w-full flex items-center bg-gray-200 text-sky-800 text-md font-semibold hover:bg-gray-700 hover:text-sky-200 transition duration-300">
                        <span>Create New Category</span>
                        <span>
                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                        </span>
                    </button>
                </li>
                {categories.length > 0 ? (
                    categories.map((item, index) => (
                        <li key={index} className="border-b border-gray-700">
                            <button
                                onClick={() =>
                                {
                                    dispatch(categoryActions.setSelectedCategory(item));
                                    setIsOpen(false);
                                }}
                                className={`${selectedCategory?.id === item.id ? `bg-gray-600` : `bg-inherit`} w-full text-left px-6 py-3 hover:bg-gray-600 transition duration-300`}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))
                ) : (
                    <div className="p-2 text-center text-gray-200">No Categories Found</div>
                )}
            </ul>

        </div>
    );
};

export default SideBar;