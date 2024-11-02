import SideBar from "@/src/components/Upload/SideBar";
import Uploader from "@/src/components/Upload/Uploader";

const UploadPage = () =>
{
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full">
                <SideBar />
            </div>
            <div className="flex-1">
                <Uploader />
            </div>
        </div>

    )
}

export default UploadPage;