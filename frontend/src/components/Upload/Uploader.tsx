"use client"
import { ContentFetchAll } from "@/actions/content/ContentFetchAll";
import { ContentMetaData } from "@/database/repository/Content";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { logger } from "@/utils/Logger";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


const Uploader = () =>
{

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const dispatch = useAppDispatch();

    const [contentMetadata, setContentMetadata] = useState<ContentMetaData[]>([]);

    const fetchContents = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const contentAction = await new ContentFetchAll();
            const contents = await contentAction.execute();
            setContentMetadata(contents);
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
    }, [selectedCategory]);

    return selectedCategory ? (
        <div className="w-full bg-inherit px-2">
            <div className="w-full p-2 flex justify-center items-center text-black md:text-4xl text-2xl font-bold border-b border-gray-400">{selectedCategory?.name}</div>
            <div className="h-full p-2">
                <div
                    onClick={() => { dispatch(modalActions.updateModalType(ModalName.CreateContent)) }}
                    className="w-full rounded-md flex justify-between items-center bg-gray-800 text-white p-3 cursor-pointer hover:bg-gray-600">
                    Add a New Content  <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                </div>
                <div className="w-full">
                    {contentMetadata.length > 0 ? (
                        contentMetadata.map((item, index) => (
                            <div key={index} className="w-full rounded-md md:p-3 p-1 bg-gray-200 text-sky-800 hover:bg-gray-400 flex justify-between items-center cursor-pointer">{item.title}</div>
                        ))
                    ) : (
                        <div className="w-full p-3 flex justify-center items-center text-black md:text-2xl text-xl font-semibold">No Content Found</div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full bg-inherit">
            <div className="w-full p-3 flex justify-center items-center text-black md:text-4xl text-2xl font-bold">Select a Category</div>
        </div>
    );
}

export default Uploader;