"use client";
import { useEffect, useState } from "react";
import Error from "../Error"
import { ISection } from "@/types/Content";
import SidebarElement from "./SidebarElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

export const MobileSidebarError = ({ error }: { error: string }) =>
{
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div className={`lg:hidden ${!show ? "sm:w-[100px] w-[50px]" : "w-screen z-5"} bg-sky-900 block  h-screen min-h-screen flex flex-col justify-start items-start px-4 py-2`}>
            <button onClick={() => setShow(!show)} className="mb-6 text-white px-2 py-1 hover:bg-sky-600 border border-white rounded-full sm:text-md text-sm">Show Error</button>
            {show && (<Error error={error} />)}
        </div>
    )
}


export const MobileSideBarContent = ({ sections }: { sections: ISection[] }) =>
{
    const [show, setShow] = useState(false);
    const router = useRouter();
    const metadataId = useParams().id as string;

    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    const onClick = (id: string) =>
    {
        setShow(false);
        router.push(`/content/${metadataId}#${id}`);
    }

    return (
        <div className={`lg:hidden ${!show ? "sm:w-[100px] w-[50px]" : "w-screen z-5"} block h-screen min-h-screen bg-marrow-dark flex flex-col justify-start items-start px-2 sm:px-4 py-2`}>
            <div className="w-full flex flex-row justify-between items-center">
                <button onClick={() => setShow(!show)} className="text-cyan-300 bg-transparent mb-6 px-2 py-1 hover:bg-gray-200 sm:text-md text-sm"><FontAwesomeIcon icon={faBars} /></button>
                {show && (<button onClick={() => setShow(false)} className="text-cyan-300 bg-transparent mb-6 px-2 py-1 hover:bg-gray-200 sm:text-md text-sm"><FontAwesomeIcon icon={faClose} /></button>)}
            </div>
            {show && sections.map((section, index) => (
                <SidebarElement section={section} key={index} onClick={onClick} />
            ))}
        </div>
    )
}