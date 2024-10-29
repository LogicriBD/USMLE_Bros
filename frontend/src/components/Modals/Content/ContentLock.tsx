import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentLockById } from "@/actions/content/ContentLockById";
import { ContentData } from "@/database/repository/Content";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { closeModal } from "@/utils/Modal";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const ContentLock = () => {

    const data = useAppSelector((state) => state.modal.data);
    const [contents, setContents] = useState<ContentData[]>([]);

    const dispatch = useAppDispatch();

    const fetchContents = async () => {
        try {
            dispatch(loaderActions.turnOn());
            const contentAction = new ContentsFetchById({ metadataId: data });
            const contents = await contentAction.execute();
            setContents(contents);
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    }

    const lockContent = async (contentId: string) => {
        try{
            dispatch(loaderActions.turnOn());
            const lockAction = new ContentLockById({ contentId: contentId });
            await lockAction.execute();
        }catch(error){
            console.log(error);
        }finally{
            fetchContents();
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchContents();
    }, []);

    return (
        <Modal
            show={true}
            onHide={() => { closeModal() }}
            centered
            animation
            keyboard
            backdrop="static"
        >
            <Modal.Header className="bg-gray-100" closeButton>
                <Modal.Title className="text-sm font-semibold text-black">Lock parts of this content</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-3 bg-gray-100">
                <span className="text-sm text-black font-normal">
                    <FontAwesomeIcon icon={faUnlock} className="text-gray-800 mx-2"/>
                    unlocked /
                </span>
                <span className="text-sm text-black font-normal">
                    <FontAwesomeIcon icon={faLock} className="text-gray-800 mx-2"/>
                    Locked
                </span>
                <div className="p-3 bg-gray-100 rounded-b-md overflow-y-auto">
                    {contents.length > 0 ? (
                        contents
                            .sort((a, b) => a.serialNumber - b.serialNumber)
                            .map((content, index) => (
                            <div key={index} className="my-2 flex flex-col bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg">
                                <div className="flex md:justify-start flex-col md:flex-row items-center p-3">
                                    <span
                                        className="cursor-pointer hover</div>:text-blue-500 transition duration-150 ease-in-out mr-2"
                                        onClick={() => { content.id ? lockContent(content.id) : console.log("No content id") }}
                                    >
                                        {content.isLocked ? (
                                            <FontAwesomeIcon icon={faLock} className="text-gray-800 hover:text-blue-500 mx-2" title="Unlock this content"/>
                                        ) : (
                                            <FontAwesomeIcon icon={faUnlock} className="text-gray-800 hover:text-blue-500 mx-2" title="Lock this content"/>
                                        )}
                                    </span>
                                    <h3 className="md:text-lg text-sm font-semibold mb-1 md:mb-0">{extractFirstH1(content.content)}</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 font-semibold">No content available</div>
                    )}
                </div>
            </Modal.Body>

        </Modal>
    );
}

export default ContentLock;