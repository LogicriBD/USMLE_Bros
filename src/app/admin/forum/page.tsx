import ForumSideBar from "@/src/components/Forum/ForumSideBar";

const ForumAdminPage = () => {
    return (
        <div className="flex flex-col w-full min-h-full max-h-fit md:flex-row">
            <div className="md:w-96 w-full">
                <ForumSideBar />
            </div>
            <div className="flex-1">
            </div>
        </div>

    )
}
export default ForumAdminPage;