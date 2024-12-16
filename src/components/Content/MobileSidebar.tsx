/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Error from "../Error"
import { ISection } from "@/types/Content";
import SidebarElement from "./SidebarElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

export const MobileSidebarError = ({ error }: { error: string }) => {
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div className={`lg:hidden ${!show ? "sm:w-[100px] w-[50px]" : "w-screen z-5"} bg-sky-900 block  h-full flex flex-col justify-start items-start px-4 py-2`}>
            <button onClick={() => setShow(!show)} className="mb-6 text-white px-2 py-1 hover:bg-sky-600 border border-white rounded-full sm:text-md text-sm">Show Error</button>
            {show && (<Error error={error} />)}
        </div>
    )
}


export const MobileSideBarContent = ({ sections }: { sections: ISection[] }) => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const metadataId = useParams().id as string;

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loaderActions.turnOff());
    }, [])

    const onClick = (id: string) => {
        setShow(false);
        router.push(`/content/${metadataId}#${id}`);
    }

    return (
        <div className={`lg:hidden ${!show ? "w-0 bg-white" : "w-full min-w-full z-5 bg-marrow-dark"} block h-full min-h-full relative flex-col justify-start items-start py-2`}>
            {!show && (
                <button
                    onClick={() => setShow(true)}
                    className="relative top-0 left-0 bg-marrow-dark border text-white font-bold text-lg border-sky-200 rounded-full mb-6 ml-2 px-3 py-2 hover:scale-105 "
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            )}
            <div className="w-full flex flex-row justify-between px-2 items-center">
                {show && (
                    <>
                        <button
                            onClick={() => setShow(false)}
                            className="bg-marrow-dark text-white font-bold text-lg rounded-full mb-6 px-3 py-2 hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>

                        <button onClick={() => setShow(false)} className="text-white bg-transparent mb-6 px-2 py-1 hover:bg-gray-200 text-lg">
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </>
                )}

            </div>
            {show && sections.map((section, index) => (
                <SidebarElement section={section} key={index} onClick={onClick} />
            ))}
        </div>
    )
}