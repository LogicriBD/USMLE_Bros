/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ISection } from "@/types/Content"
import Error from "../Error"
import SidebarElement from "./SidebarElement"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/src/context/store/hooks";
import { useEffect } from "react";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

export const DesktopSideBarError = ({ error }: { error: string }) =>
{

    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div className="w-1/3 xl:w-1/4 2xl:w-1/5 hidden lg:block h-full bg-gray-100 flex flex-col px-4 py-2">
            <Error error={error} />
        </div>
    )
}


export const DesktopSideBarContent = ({ sections }: { sections: ISection[] }) =>
{
    const router = useRouter();
    const metadataId = useParams().id as string;

    const onClick = (id: string) =>
    {
        router.push(`/content/${metadataId}#${id}`);
    }

    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div className="h-full w-1/3 xl:w-1/4 2xl:w-1/5 hidden lg:block bg-marrow-dark flex flex-col px-4 py-2 border-r border-gray-300">
            {sections.map((section, index) => (
                <SidebarElement section={section} key={index} onClick={onClick} />
            ))}
        </div>
    )
}