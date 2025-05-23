/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { ContentDeleteById } from "@/actions/content/ContentDeleteById";
import { ContentFetchByCategory } from "@/actions/content/ContentFetchByCategory";
import { ContentMetaData } from "@/database/repository/Content";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { logger } from "@/utils/Logger";
import { faEdit, faEye, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../Content/SearchBar";
import { useRouter } from "next/navigation";


const Uploader = () =>
{

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [contentMetadata, setContentMetadata] = useState<ContentMetaData[]>([]);
    const [searchedContents, setSearchedContents] = useState<ContentMetaData[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    const fetchContents = async () =>
    {
        try
        {
            if (selectedCategory)
            {
                dispatch(loaderActions.turnOn());
                const contentAction = new ContentFetchByCategory({ categoryId: selectedCategory.id });
                const contents = await contentAction.execute();
                setContentMetadata(contents);
                setSearchedContents(contents);
            }
        } catch (error)
        {
            logger.error(error);
        }
        finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    const handleSearch = (e: any) =>
    {
        const searchText = e.target.value;
        if (searchText === '')
        {
            setSearchedContents(contentMetadata);
        }
        else
        {
            const searched = contentMetadata.filter(content => content.title.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedContents(searched);
        }
        setSearchText(searchText);
    }

    const handleDelete = async (id: string) =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const contentAction = new ContentDeleteById({ id });
            await contentAction.execute();
            dispatch(submitActions.toggleSubmit());
        } catch (error)
        {
            logger.error(error);
        }
        finally
        {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() =>
    {
        fetchContents();
    }, [selectedCategory, isSubmit]);

    const openEditOption = (metadata: ContentMetaData) =>
    {
        if (selectedCategory)
        {
            router.push(`/admin/content/${selectedCategory.id}/${selectedCategory.name}` + "?id=" + metadata.id + "&title=" + metadata.title + "&imageUrl=" + metadata.imageUrl + "&categoryId=" + metadata.categoryId);
        }
    }

    const openCreateOption = () =>
    {
        if (selectedCategory)
        {
            router.push(`/admin/content/${selectedCategory.id}/${selectedCategory.name}`);
        }
    }

    return selectedCategory ? (
        <div className="w-full bg-inherit px-2">
            <div className="w-full p-2 flex justify-center items-center text-cyan-300 md:text-4xl text-2xl font-bold border-b border-gray-400">{selectedCategory?.name}</div>
            <div className="h-full p-2 flex flex-col">
                <div className="w-full py-2 mb-4">
                    <SearchBar searchText={searchText} setSearchText={handleSearch} />
                </div>
                <div
                    onClick={openCreateOption}
                    className="w-full rounded-md flex justify-between items-center bg-marrow font-bold text-white p-3 cursor-pointer hover:bg-marrow-dark">
                    Add a New Content  <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                </div>
                <div className="w-full">
                    {searchedContents.length > 0 ? (
                        searchedContents.map((item, index) => (
                            <div key={index} className="my-2 flex flex-col bg-gray-200 text-marrow-dark border-1 border-gray-600 rounded-lg px-3 py-2 shadow-md">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 w-full flex justify-start">
                                        <h3 className="md:text-lg text-sm font-semibold mb-2">{item.title}</h3>
                                    </div>
                                    <div className="md:w-1/3 w-full flex md:justify-center jusify-start">
                                    </div>
                                    <div className="md:w-1/3 w-full flex md:justify-end justify-start">
                                        <p className="text-sm font-semibold">{formatFirebaseDate(item.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex md:justify-between flex-col md:flex-row">
                                    <h3 className="text-sm font-normal">Author: {item.userName}</h3>
                                    <div className="md:pt-2 flex justify-end space-x-4">
                                        <Link className="" target="_blank" href={`/content/${item.id}`} passHref>
                                            <FontAwesomeIcon icon={faEye} className="pr-2 pb-0.5 cursor-pointer text-marrow-dark" title="View" />
                                        </Link>
                                        <FontAwesomeIcon icon={faEdit} className="pr-2 cursor-pointer" title="Edit" onClick={() => { openEditOption(item) }} />
                                        <FontAwesomeIcon
                                            onClick={() => handleDelete(item.id ?? "")}
                                            icon={faTrash}
                                            className="pr-2 cursor-pointer"
                                            title="Delete"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full p-3 flex justify-center items-center text-black md:text-2xl text-xl font-semibold">No Content Found</div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full bg-inherit">
            <div className="w-full p-3 flex justify-center items-center text-cyan-300 md:text-4xl text-2xl font-bold">Select a Category</div>
        </div>
    );
}

export default Uploader;