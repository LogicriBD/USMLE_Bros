"use client";
import { faCaretDown, faCaretUp, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { categoryActions } from "@/src/context/store/slices/category-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import SpinLoading from "../Spinner";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { StepCreate } from "@/actions/category/StepCreate";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { logger } from "@/utils/Logger";

const SideBar = () =>
{
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const callback = () =>
    {
        dispatch(categoryActions.setSelectedCategory(null));
    }
    const { selectedCategory, loading, stepBasedCategories } = useCategories([isSubmit], callback);

    const handleSubmit = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const stepAction = new StepCreate();
            await stepAction.execute();
            dispatch(submitActions.toggleSubmit());
        } catch (error)
        {
            logger.error(error);
            dispatch(modalActions.addModal({ type: ModalName.ErrorModal, data: error }));
        }
        finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    if (loading)
    {
        return (
            <div className="w-full bg-marrow text-white md:min-h-screen min-h-0">
                <SpinLoading invert />
            </div>
        )
    }

    return (
        <div className="w-full bg-marrow text-white md:min-h-full min-h-0">
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
                            handleSubmit();
                        }}
                        className="p-2 w-full flex items-center bg-marrow text-cyan-300 text-md font-semibold hover:bg-marrow-dark hover:text-cyan-500 transition duration-300">
                        <span>Create New Step</span>
                        <span>
                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                        </span>
                    </button>
                </li>
                {
                    stepBasedCategories && stepBasedCategories.length > 0 && stepBasedCategories.map((step, index) =>
                    {
                        return (
                            <div key={index} className="ms-2">
                                <div className="w-full">
                                    <div className="p-2 text-left text-white text-lg font-bold">Step {step.step.name}</div>
                                    <li className="border-b border-gray-700"><button
                                        onClick={() =>
                                        {
                                            dispatch(modalActions.addModalProps(step.step.id))
                                            dispatch(modalActions.updateModalType(ModalName.CreateCategory));
                                            setIsOpen(false);
                                        }}
                                        className="p-2 w-full flex items-center bg-marrow text-cyan-300 text-md font-semibold hover:bg-marrow-dark hover:text-cyan-500 transition duration-300">
                                        <span>Create New Category</span>
                                        <span>
                                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                                        </span>
                                    </button></li>
                                    {step.categories.length > 0 ? (
                                        step.categories.map((item, index) => (
                                            <li key={index} className="border-b border-cyan-900">
                                                <button
                                                    onClick={() =>
                                                    {
                                                        dispatch(categoryActions.setSelectedCategory(item));
                                                        setIsOpen(false);
                                                    }}
                                                    className={`${selectedCategory?.id === item.id ? `bg-marrow-dark` : `bg-inherit`} w-full text-left px-6 py-3 hover:bg-marrow-dark transition duration-300`}
                                                >
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <div className="p-2 text-center text-cyan-200">No Categories Found</div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </ul>

        </div>
    );
};

export default SideBar;