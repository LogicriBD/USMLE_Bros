"use client";

import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { Modal } from "react-bootstrap";

const CategoriesModal = () =>
{
    const dispatch = useAppDispatch();
    const { categories } = useCategories()

    return (
        <Modal
            show={true}
            onHide={() => dispatch(modalActions.removeModal())}
            animation
            centered
            keyboard
            className="rounded-xl h-96 w-96"
        >
            <Modal.Body className="p-0 rounded-xl overflow-y-scroll">
                <div className="flex flex-row w-full h-full min-h-96">
                    <div className="w-1/4 min-h-full bg-indigo-900"></div>
                    <div className="w-3/4 min-h-full bg-gray-100 flex flex-col">
                        <div className="w-full flex items-center justify-center py-6">
                            <h1 className="text-black font-semibold text-2xl">Select a category</h1>
                        </div>
                        <div className="w-full flex md:p-4 p-2 justify-center">
                            <div className="grid md:grid-cols-3 md:gap-6 grid-cols-2 gap-2 justify-center mx-auto">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`text-sky-100 bg-indigo-900 hover:bg-indigo-600 focus:bg-sky-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full md:px-4 px-2 py-2 text-center flex items-center justify-center transition duration-300`}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CategoriesModal;