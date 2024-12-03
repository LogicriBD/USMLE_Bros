import { useCategories } from "@/src/hooks/categories/useCategories";
import SpinLoading from "../Spinner";

const FilterMobile = () =>
{

    const { stepBasedCategories, selectedCategory, selectCategory, loading } = useCategories();

    if (loading)
    {
        return (
            <div className="w-full">
                <SpinLoading />
            </div>
        )
    }

    return (
        <div className="w-full pb-36 bg-inherit flex flex-col z-20 relative divide-y-2 divide-gray-600 divide-solid max-h-screen overflow-y-auto">
            <div className="text-lg font-bold text-white justify-start text-start flex w-full px-2 py-3">Categories</div>
            {stepBasedCategories.length > 0 && stepBasedCategories.map((step, index) => (
                <div key={index} className="ms-2">
                    <div className="w-full">
                        <div className="p-2 text-left text-white text-lg font-bold">Step {step.step.name}</div>
                        {step.categories.map((category, index) => (
                            <div
                                key={index}
                                className={`${selectedCategory?.id === category.id ? `bg-gray-700` : `bg-gray-800`} flex w-full hover:bg-gray-700 text-gray-200 transition duration-500 font-semibold cursor-pointer text-sm px-4 py-3`}
                                onClick={() => selectCategory(category)}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FilterMobile;