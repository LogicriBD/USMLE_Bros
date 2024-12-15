/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchThreadById } from "@/actions/forum/FetchThreadById";
import ThreadDisplay from "@/src/components/Forum/Thread/ThreadDisplay";
import { Props } from "@/types/Metadata";
import { ResolvingMetadata } from "next";


export async function generateMetadata({ params, searchParams }: Props,
    parent: ResolvingMetadata)
{
    const id = (await params).id
    const threadActions = new FetchThreadById(id);
    const thread = await threadActions.execute();
    if (!thread)
    {
        throw new Error("Could not fetch metadata");
    }

    return {
        title: `USMLE Bros | Threads - ${thread.title}`,
        description: `Learn about ${thread.title}, containing information about ${thread.description} by ${thread.createdBy} on ${thread.createdAt}`,
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
        keywords: [thread.title, thread.createdBy, "USMLE", "Bros", "Threads", "USMLE Bros Threads", "USMLE Bros Threads Page", "USMLE Bros Threads Display", "USMLE Bros Threads Page", "USMLE Bros Threads Display Page", thread.description]
    }
}

const ThreadPage = ({ params }: { params: { id: string } }) =>
{

    const { id } = params;

    return (
        <div className="w-full h-full flex">
            <ThreadDisplay id={id} />
        </div>
    );
}

export default ThreadPage;