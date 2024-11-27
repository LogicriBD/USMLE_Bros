import ForumLevelOne from "@/src/components/Forum/ForumDisplay/ForumLevelOne";
import ForumLevelTwo from "@/src/components/Forum/ForumDisplay/ForumLevelTwo";
import SpinLoading from "@/src/components/Spinner";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const ForumLoader = () => {
    return (
        <div className="w-full h-full flex flex-grow items-center justify-center">
            <SpinLoading />
        </div>
    )
}

const ForumPage = async ({ params }: { params: { id: string, level: string } }) => {
    const { id, level } = params;

    if (level === "1") {
        return (
            <div className="w-full h-full flex">
                <Suspense fallback={<ForumLoader />}>
                    <ForumLevelOne id={id} />
                </Suspense>
            </div>
        )
    } else if (level === "2") {
        return (
            <div className="w-full h-full flex">
                <Suspense fallback={<ForumLoader />}>
                    <ForumLevelTwo id={id} />
                </Suspense>
            </div>
        )
    } else {
        notFound();
    }
}

export default ForumPage