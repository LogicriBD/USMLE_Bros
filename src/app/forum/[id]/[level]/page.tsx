/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchTopicById } from "@/actions/forum/FetchTopicById";
import ForumLevelOne from "@/src/components/Forum/ForumDisplay/ForumLevelOne";
import ForumLevelTwo from "@/src/components/Forum/ForumDisplay/ForumLevelTwo";
import SpinLoading from "@/src/components/Spinner";
import { ForumProps } from "@/types/Metadata";
import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }: ForumProps,
    parent: ResolvingMetadata)
{
    const { id, level } = (await params)
    const topicActions = new FetchTopicById(id);
    const topic = await topicActions.execute();
    if (!topic)
    {
        throw new Error("Could not fetch metadata");
    }

    return {
        title: `USMLE Bros | Forum - ${topic.title}`,
        description: `Learn about ${topic.title} for level ${level}, containing information about ${topic.description}`,
        authors: [{
            name: "USMLE Bros",
            url: "https://usmlebros.com/",
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
        keywords: [topic.title, "USMLE", "Bros", "Forum", "USMLE Bros Forum", "USMLE Bros Forum Page", "USMLE Bros Forum Display", "USMLE Bros Forum Page", "USMLE Bros Forum Display Page", topic.description]
    }
}

const ForumLoader = () =>
{
    return (
        <div className="w-full h-full flex flex-grow items-center justify-center">
            <SpinLoading />
        </div>
    )
}

const ForumPage = ({ params }: { params: { id: string, level: string } }) =>
{
    const { id, level } = params;

    if (level === "1")
    {
        return (
            <div className="w-full h-full flex">
                <Suspense fallback={<ForumLoader />}>
                    <ForumLevelOne id={id} />
                </Suspense>
            </div>
        )
    } else if (level === "2")
    {
        return (
            <div className="w-full h-full flex">
                <Suspense fallback={<ForumLoader />}>
                    <ForumLevelTwo id={id} />
                </Suspense>
            </div>
        )
    } else
    {
        notFound();
    }
}

export default ForumPage