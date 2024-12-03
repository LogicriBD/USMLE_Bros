"use client";
import { useCategories } from "@/src/hooks/categories/useCategories";
import SpinLoading from "../Spinner";
import { ContentMetaData } from "@/database/repository/Content";
import { useEffect, useState } from "react";
import { ContentFetchByCategory } from "@/actions/content/ContentFetchByCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useAppDispatch } from "@/src/context/store/hooks";
import { useNavigate } from "@/src/hooks/useNavigate";

const Filter = () =>
{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { stepBasedCategories, selectedCategory, selectCategory, loading } = useCategories();
    const [toggleSteps, setToggleSteps] = useState(stepBasedCategories.map(() => false));
    const handleNavigate = (id: string | undefined) =>
    {
        if (!id) return;
        dispatch(loaderActions.turnOn());
        navigate(`/content/${id}`);
    }

    const [contents, setContents] = useState<ContentMetaData[]>([]);

    useEffect(() =>
    {
        if (selectedCategory)
        {
            const contentFetchMetadata = new ContentFetchByCategory({
                categoryId: selectedCategory.id
            });
            contentFetchMetadata.execute().then((data) =>
            {
                if (data)
                {
                    setContents(data);
                }
            })
        }
    }, [selectCategory])

    const toggleStep = (index: number) =>
    {
        setToggleSteps((prev) =>
        {
            const newToggleSteps = [...prev];
            newToggleSteps[index] = !newToggleSteps[index];
            return newToggleSteps;
        });
    }

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
                {stepBasedCategories.length > 0 && stepBasedCategories.map((step, index) => (
                    <div key={index} className="w-full px-4 py-2">
                        <div 
                            onClick={() => toggleStep(index)}
                            className="w-full justify-between flex flex-row">
                            <div className={`w-full p-2 text-left text-black text-lg font-bold cursor-pointer`}>Step {step.step.name}</div>
                            {toggleSteps[index] && (<FontAwesomeIcon icon={faChevronDown} className="text-black cursor-pointer py-2" />)}
                            {!toggleSteps[index] && (<FontAwesomeIcon icon={faChevronUp} className="text-black cursor-pointer py-2" />)}
                        </div>
                        {toggleSteps[index] && step.categories.map((category, index) => (
                            <div key={index}>
                                <div
                                    className={`${selectedCategory?.id === category.id ? `bg-gray-200` : `bg-gray-100`} flex w-full hover:bg-gray-200 transition duration-500 font-semibold cursor-pointer font-normal text-sm px-4 py-2`}
                                    onClick={() => selectCategory(category)}
                                >
                                    {category.name}
                                </div>
                                <ul className="ms-2 list-disc list-inside">
                                    {selectedCategory?.id === category.id && contents.length > 0 && contents.map((content, index) => (
                                        <li key={index} className="text-black text-sm font-semibold px-4 py-2 cursor-pointer" onClick={() => handleNavigate(content.id)}>
                                            {content.title}
                                        </li>
                                    )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>))
                }
            </div>
        </div>
    );
}

export default Filter;