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

const ContentsMetadataDisplay = () => {
    const dispatch = useAppDispatch();
    const { selectedCategory } = useCategories();
    const [searchedContents, setSearchedContents] = useState<any[]>([]);
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [searchText, setSearchText] = useState<string>('');

    const fetchContents = async () => {
        try {
            if (selectedCategory) {
                const contentFetchByCategoryId = new ContentFetchByCategory({
                    categoryId: selectedCategory.id
                });
                const fetchedContents = await contentFetchByCategoryId.execute();
                setContents(fetchedContents);
                setSearchedContents(fetchedContents);
                dispatch(loaderActions.turnOff())
            }
        }
        catch (err: any) {
            setError(err.message);
            dispatch(loaderActions.turnOff());
        }

    }

    useEffect(() => {
        dispatch(loaderActions.turnOn());
        fetchContents();
    }, [selectedCategory])

    const handleSearch = (e: any) => {
        const searchText = e.target.value;
        if (searchText === '') {
            setSearchedContents(contents);
        }
        else {
            const searched = contents.filter(content => content.title.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedContents(searched);
        }
        setSearchText(searchText);
    }

    return (
        <div className="w-full flex flex-col mt-4">
            <div className="flex justify-start w-full">
                <SearchBar searchText={searchText} setSearchText={handleSearch} />
            </div>
            <div className="grid justify-items-start p-2 md:p-4 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-2">
                <Error error={error} />

                {searchedContents.map((content, index) => (
                    <ContentCard
                        id={content.id}
                        key={index}
                        image={content.imageUrl ? content.imageUrl : '/logos/icon.png'}
                        title={content.title}
                        description={content.userName}
                        createdAt={content.createdAt}
                    />
                ))}
            </div>

        </div>
    );
}

export default ContentsMetadataDisplay;
