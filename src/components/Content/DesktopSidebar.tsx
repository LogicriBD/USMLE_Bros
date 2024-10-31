"use client";
import { ISection } from "@/types/Content"
import Error from "../Error"
import SidebarElement from "./SidebarElement"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export const DesktopSideBarError = ({ error }: { error: string }) =>
{
    return (
        <div className="w-1/3 xl:w-1/4 2xl:w-1/5 hidden lg:block h-screen bg-gray-100 flex flex-col px-4 py-2">
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
    return (
        <div className="w-1/3 xl:w-1/4 2xl:w-1/5 hidden lg:block h-screen bg-gray-100 flex flex-col px-4 py-2 border-r border-gray-300">
            {sections.map((section, index) => (
                <SidebarElement section={section} key={index} onClick={onClick} />
            ))}
        </div>
    )
}