import ContentDisplay from "@/src/components/Content/ContentDisplay";
import Sidebar from "@/src/components/Content/Sidebar";
import SpinLoading from "@/src/components/Spinner";
import { Suspense } from "react";

const SidebarLoading = () =>
{
    return (
        <div className="w-1/4 h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
            <SpinLoading invert />
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

const ContentPage = ({ params }: { params: { id: string } }) =>
{
    return (
        <div className="w-full flex flex-row h-screen">
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