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
import AdBanner from "../Ads/AdBanner";
import { ContentFetchAll } from "@/actions/content/ContentFetchAll";
import { useSearchParams } from "next/navigation";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";

const ContentsMetadataDisplay = () =>
{
    const dispatch = useAppDispatch();
    const query = useSearchParams();
    const { selectedCategory } = useCategories();
    const [searchedContents, setSearchedContents] = useState<any[]>([]);
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [searchText, setSearchText] = useState<string>('');

    const fetchContents = async () =>
    {
        dispatch(loaderActions.turnOn());
        try
        {
            if (selectedCategory && selectedCategory.id)
            {
                const contentFetchByCategoryId = new ContentFetchByCategory({
                    categoryId: selectedCategory.id
                });
                const fetchedContents = await contentFetchByCategoryId.execute();
                setContents(fetchedContents);
                setSearchedContents(fetchedContents);
            }
            else
            {
                const contentFetchAll = new ContentFetchAll();
                const fetchedContents = await contentFetchAll.execute();
                setContents(fetchedContents);
                setSearchedContents(fetchedContents);
            }
        }
        catch (err: any)
        {
            setError(err.message);
        }
        finally
        {
            dispatch(loaderActions.turnOff());
        }

    }

    useEffect(() =>
    {
        if (query)
        {
            const login = query.get('login');
            if (login === 'true')
            {
                dispatch(modalActions.updateModalType(ModalName.AuthModal))
            }
        }
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
        <div className="w-full h-full max-h-full flex flex-col pt-4 space-y-2">
            <div className="flex justify-start w-full pb-6">
                <SearchBar searchText={searchText} setSearchText={handleSearch} />
            </div>
            <div className="tablet:hidden flex w-full items-center justify-center p-2">
                <AdBanner
                    dataAdSlot={process.env.DATA_AD_SLOT_DISPLAY_AD}
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                />
            </div>
            <div className="grid h-full overflow-y-auto scrollbar-thin max-h-full justify-items-center p-2 md:p-4 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 pt-2">
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
