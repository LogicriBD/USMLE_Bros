"use client";
import { useCategories } from "@/src/hooks/categories/useCategories";
import SpinLoading from "../Spinner";

const Filter = () =>
{
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

        <div className="flex tablet:w-96 md:w-82 w-72 h-auto max-h-96 overflow-y-auto scroll-smooth rounded-lg bg-gray-100 shadow-md z-20">
            <div className="flex w-full flex-col items-center justify-start divide-y-2 divide-gray-300 divide-solid">
                <div className="text-lg font-bold text-black justify-start text-start flex w-full px-2 py-3 sticky-top bg-gray-100">Categories</div>
                {categories.length > 0 && categories.map((category, index) => (
                    <div
                        key={index}
                        className={`${selectedCategory?.id === category.id ? `bg-gray-200` : `bg-gray-100`} flex w-full hover:bg-gray-200 transition duration-500 font-semibold cursor-pointer font-normal text-sm px-4 py-2`}
                        onClick={() => selectCategory(category)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;