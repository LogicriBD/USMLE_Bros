import ForumAdminMain from "@/src/components/Forum/ForumAdminMain";
import ForumSideBar from "@/src/components/Forum/ForumSideBar";

const ForumAdminPage = () => {
    return (
        <div className="flex flex-col w-full min-h-full max-h-fit md:flex-row">
            <div className="md:w-96 w-full md:max-h-full max-h-96">
                <ForumSideBar />
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <ForumAdminMain />
            </div>
        </div>

    )
}
export default ForumAdminPage;