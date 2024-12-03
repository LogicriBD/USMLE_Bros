/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { firestore } from "@/database/config/adminApp";
import ContentDisplay from "@/src/components/Content/ContentDisplay";
import Sidebar from "@/src/components/Content/Sidebar";
import SpinLoading from "@/src/components/Spinner";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { Props } from "@/types/Metadata";
import { ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";


export async function generateMetadata({ params, searchParams }: Props,
    parent: ResolvingMetadata)
{
    const id = (await params).id
    const contentFetchById = new ContentFetchMetadataById(id);
    const contents = await contentFetchById.execute();
    if (!contents)
    {
        throw new Error("Could not fetch metadata");
    }

    return {
        title: `USMLE Bros | Content - ${contents.title}`,
        description: `Learn about ${contents.title}, containing information about ${contents.sections?.join(", ")}`,
        openGraph: {
            images: [contents?.imageUrl],
        },
        authors: [{
            name: "USMLE Bros",
            url: "https://usmle-bros.vercel.app/",
        }, {
            name: "RobustTech BD",
            url: "https://robustechbd.com/"
        }],
        icons: [
            {
                href: "/logos/icon.png",
                sizes: "192x192",
                type: "image/png",
                url: "/logos/icon.png",
            },
        ],
        keywords: [contents.title, "USMLE", "Bros", "Content", "USMLE Bros Content", "USMLE Bros Content Page", "USMLE Bros Content Display", "USMLE Bros Content Page", "USMLE Bros Content Display Page", ...contents.sections ? contents.sections : []]
    }
}

const SidebarLoading = () =>
{
    return (
        <div className="w-1/4 h-screen bg-gray-200 flex flex-col flex-grow px-4 py-2">
            <SpinLoading />
        </div>
    )
}

const ContentLoading = () =>
{
    return (
        <div className="w-3/4 h-screen bg-white flex flex-col flex-grow px-4 py-2">
            <SpinLoading />
        </div>
    )
}

const ContentPage = async ({ params }: { params: { id: string } }) =>
{
    const updateSession = async () =>
    {
        ServerAuthContext.setLoggedIn(false);
        const cookieStore = await cookies();
        const cookie = cookieStore.get("access");
        if (!cookie)
        {
            ServerAuthContext.setLoggedIn(false);
        }
        else
        {
            if (!ServerAuthContext.isLoggedIn())
            {
                const session = await firestore.collection("sessions").where("accessToken", "==", cookie.value);
                const sessionSnapshot = await session.get();
                if (sessionSnapshot.empty)
                {
                    ServerAuthContext.setLoggedIn(false);
                }
                else
                {
                    const sessionData = await sessionSnapshot.docs[0].data();
                    const isActive = sessionData.active === true;
                    ServerAuthContext.setLoggedIn(isActive);
                }
            }
        }
    }

    await updateSession();
    return (
        <div className="w-full flex flex-row h-full min-h-full">
            <Suspense fallback={<SidebarLoading />}>
                <Sidebar id={params.id} />
            </Suspense>
            <Suspense fallback={<ContentLoading />}>
                <ContentDisplay id={params.id} />
            </Suspense>
        </div>
    );
}

export default ContentPage;