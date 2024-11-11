import SideBar from "@/src/components/Upload/SideBar";
import Uploader from "@/src/components/Upload/Uploader";

const UploadPage = () =>
{
    return (
        <div className="flex flex-col w-full min-h-full max-h-fit md:flex-row">
            <div className="md:w-64 w-full">
                <SideBar />
            </div>
            <div className="flex-1">
                <Uploader />
            </div>
        </div>

    )
}

export default UploadPage;