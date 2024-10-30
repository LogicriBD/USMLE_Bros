import ContentDisplay from "@/src/components/Content/ContentDisplay";
import Sidebar from "@/src/components/Content/Sidebar";

const ContentPage = ({ params }: { params: { id: string } }) =>
{
    return (
        <div className="w-full flex flex-row h-screen">
            <Sidebar id={params.id} />
            <ContentDisplay id={params.id} />
        </div>
    );
}

export default ContentPage;