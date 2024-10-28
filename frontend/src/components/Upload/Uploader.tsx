"use client"
import { ContentFetchByCategory } from "@/actions/content/ContentFetchByCategory";
import { ContentMetaData } from "@/database/repository/Content";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { logger } from "@/utils/Logger";
import { faEdit, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


const Uploader = () => {

    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const dispatch = useAppDispatch();

    const [contentMetadata, setContentMetadata] = useState<ContentMetaData[]>([]);

    const fetchContents = async () => {
        try {
            if(selectedCategory){
                dispatch(loaderActions.turnOn());
                const contentAction = new ContentFetchByCategory({categoryId: selectedCategory.id});
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
                            <div key={index} className="my-2 flex flex-col bg-gray-200 text-sky-800 rounded-lg px-3 py-2 shadow-md hover:bg-gray-300 transition duration-200 ease-in-out cursor-pointer">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm font-semibold">{formatFirebaseDate(item.createdAt)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-normal">Author: {item.userName}</h3>
                                    <div className="mt-2">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" /> 
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