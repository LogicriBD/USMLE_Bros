"use client"
import { ContentFetchByCategory } from "@/actions/content/ContentFetchByCategory";
import { ContentMetaData } from "@/database/repository/Content";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { logger } from "@/utils/Logger";
import { faEdit, faEye, faLock, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";


const Uploader = () => {

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const dispatch = useAppDispatch();

    const [contentMetadata, setContentMetadata] = useState<ContentMetaData[]>([]);

    const fetchContents = async () => {
        try {
            if (selectedCategory) {
                dispatch(loaderActions.turnOn());
                const contentAction = new ContentFetchByCategory({ categoryId: selectedCategory.id });
                const contents = await contentAction.execute();
                setContentMetadata(contents);
            }
        } catch (error) {
            logger.error(error);
        }
        finally {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchContents();
    }, [selectedCategory, isSubmit]);

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
                            <div key={index} className="my-2 flex flex-col bg-gray-200 text-sky-800 border-1 border-gray-600 rounded-lg px-3 py-2 shadow-md">
                                <div className="flex md:justify-between flex-col md:flex-row ">
                                    <h3 className="md:text-lg text-sm font-semibold mb-2">{item.title}</h3>
                                    <span 
                                        onClick={() => { dispatch(modalActions.addModal({
                                            type:ModalName.ContentLock, 
                                            data:item.id
                                        }))}}
                                        className="p-2 text-gray-200 bg-gray-700 rounded-md text-sm font-semibold mb-2 md:mb-0 hover:bg-gray-500 transition duration-300 cursor-pointer">
                                        Lock this content <FontAwesomeIcon icon={faLock} className="pl-2" />
                                    </span>
                                    <p className="text-sm font-semibold">{formatFirebaseDate(item.createdAt)}</p>
                                </div>
                                <div className="flex md:justify-between flex-col md:flex-row">
                                    <h3 className="text-sm font-normal">Author: {item.userName}</h3>
                                    <div className="md:pt-2 flex justify-end space-x-4">
                                        <Link target="_blank" href={`/content/${item.id}`} passHref>
                                            <FontAwesomeIcon icon={faEye} className="pr-2 cursor-pointer" title="View" />
                                        </Link>
                                        <FontAwesomeIcon icon={faEdit} className="pr-2 cursor-pointer" title="Edit" />
                                        <FontAwesomeIcon icon={faTrash} className="pr-2 cursor-pointer" title="Delete" />

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
            <div className="w-full p-3 flex justify-center items-center text-black md:text-4xl text-2xl font-bold">Select a Category</div>
        </div>
    );
}

export default Uploader;