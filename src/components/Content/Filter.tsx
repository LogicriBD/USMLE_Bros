"use client";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { ModalName } from "@/utils/enums/ModalEnum";
import SpinLoading from "../Spinner";

const Filter = () =>
{
    const dispatch = useAppDispatch();
    const { categories, selectedCategory, selectCategory, loading } = useCategories();

    if (loading)
    {
        return (
            <div className="w-full">
                <SpinLoading />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-center">
                <div className="flex space-x-4 flex-row mt-4">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`${selectedCategory?.id === category.id ? "text-indigo-900 bg-gray-200" : "text-sky-100 bg-indigo-900"} hover:bg-indigo-600 transition duration-300 focus:bg-sky-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center
                            ${index === 3 ? 'hidden md:block' : ''} 
                            ${index === 2 ? 'hidden sm:block md:block' : ''} 
                            ${index === 1 ? 'hidden block sm:block' : ''}`}
                            onClick={() => selectCategory(category)}
                        >
                            {category.name}
                        </div>
                    ))}
                    <div
                        onClick={() => dispatch(modalActions.updateModalType(ModalName.Categories))}
                        className="text-sky-100 bg-indigo-900 focus:bg-sky-300 hover:bg-indigo-600 transition duration-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center">
                        All
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;