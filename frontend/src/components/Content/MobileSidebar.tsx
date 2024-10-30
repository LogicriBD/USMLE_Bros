"use client";
import { useState } from "react";
import Error from "../Error"
import { ISection } from "@/types/Content";
import SidebarElement from "./SidebarElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export const MobileSidebarError = ({ error }: { error: string }) =>
{
    const [show, setShow] = useState(false);

    return (
        <div className={`lg:hidden ${!show ? "sm:w-[100px] w-[50px]" : "w-screen z-5"} bg-sky-900 block  h-screen flex flex-col justify-start items-start px-4 py-2`}>
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

    const onClick = (id: string) =>
    {
        setShow(false);
        router.push(`/content/${metadataId}#${id}`);
    }

    return (
        <div className={`lg:hidden ${!show ? "sm:w-[100px] w-[50px]" : "w-screen z-5"} block h-screen bg-sky-900 flex flex-col justify-start items-start px-2 sm:px-4 py-2`}>
            <button onClick={() => setShow(!show)} className="mb-6 text-white px-2 py-1 hover:bg-sky-600 border border-white rounded-full sm:text-md text-sm"><FontAwesomeIcon icon={faBars} /></button>
            {show && sections.map((section, index) => (
                <SidebarElement section={section} key={index} onClick={onClick} />
            ))}
        </div>
    )
}