"use client";

import { CategoryData } from "@/database/repository/Category";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { Modal } from "react-bootstrap";
import SpinLoading from "../Spinner";

interface ICategoriesModalContent
{
    categories: CategoryData[];
    selectCategory: (category: CategoryData) => void;
    selectedCategory: CategoryData | null;
    loading: boolean;
}

const CategoriesModalContent = ({ categories, selectCategory, selectedCategory, loading }: ICategoriesModalContent) =>
{
    if (loading)
    {
        return (
            <div className="w-full">
                <SpinLoading />
            </div>
        )
    }
    return (
        <div className="flex flex-row w-full h-full min-h-96">
            <div className="w-1/4 min-h-full bg-indigo-900"></div>
            <div className="w-3/4 min-h-full bg-gray-100 flex flex-col">
                <div className="w-full flex items-center justify-center py-6">
                    <h1 className="text-cyan-300 font-semibold text-2xl">Select a category</h1>
                </div>
                <div className="w-full flex md:p-4 p-2 justify-center">
                    <div className="grid md:grid-cols-3 md:gap-6 grid-cols-2 gap-2 justify-center mx-auto">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`${selectedCategory?.id === category.id ? "text-indigo-900 bg-gray-200" : "text-sky-100 bg-indigo-900"} hover:bg-indigo-600 focus:bg-sky-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full md:px-4 px-2 py-2 text-center flex items-center justify-center transition duration-300`}
                                onClick={() => selectCategory(category)}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CategoriesModal = () =>
{
    const dispatch = useAppDispatch();
    const { categories, selectCategory, selectedCategory, loading } = useCategories()

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
                <CategoriesModalContent categories={categories} selectCategory={selectCategory} selectedCategory={selectedCategory} loading={loading} />
            </Modal.Body>
        </Modal>
    )
}

export default CategoriesModal;