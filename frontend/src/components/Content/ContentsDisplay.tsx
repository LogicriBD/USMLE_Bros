/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useCategories } from "@/src/hooks/categories/useCategories";
import { ContentFetchByCategory } from "@/actions/content/ContentFetchByCategory";
import Error from "../Error";
import SearchBar from "./SearchBar";

const ContentsDisplay = () =>
{
    const dispatch = useAppDispatch();
    const { selectedCategory } = useCategories();
    const [searchedContents, setSearchedContents] = useState<any[]>([]);
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [searchText, setSearchText] = useState<string>('');

    const fetchContents = async () =>
    {
        try
        {
            if (selectedCategory)
            {
                const contentFetchByCategoryId = new ContentFetchByCategory({
                    categoryId: selectedCategory.id
                });
                const fetchedContents = await contentFetchByCategoryId.execute();
                setContents(fetchedContents);
                setSearchedContents(fetchedContents);
                dispatch(loaderActions.turnOff())
            }
        }
        catch (err: any)
        {
            setError(err.message);
            dispatch(loaderActions.turnOff());
        }

    }

    useEffect(() =>
    {
        fetchContents();
    }, [selectedCategory])

    const handleSearch = (e: any) =>
    {
        const searchText = e.target.value;
        if (searchText === '')
        {
            setSearchedContents(contents);
        }
        else
        {
            const searched = contents.filter(content => content.title.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedContents(searched);
        }
        setSearchText(searchText);
    }

    return (
        <div className="w-full flex flex-col mt-4">
            <SearchBar searchText={searchText} setSearchText={handleSearch} />
            <div className="grid p-4 md:p-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center mx-auto max-w-7xl">
                <Error error={error} />

                {searchedContents.map((content, index) => (
                    <ContentCard id={content.id} key={index} image={content.imageUrl ? content.imageUrl : '/logos/icon.png'} title={content.title} description={content.userName} />
                ))}
            </div>
        </div>
    );
}

export default ContentsDisplay;
