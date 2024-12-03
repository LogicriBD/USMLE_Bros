import SideBar from "@/src/components/Upload/SideBar";
import Uploader from "@/src/components/Upload/Uploader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Upload content",
    description: "Add contents on USMLE Bros as Admin that has a wide range of categories to add content to",
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
    keywords: ["USMLE", "Bros", "Upload", "Content", "Add Content", "Add Content on USMLE Bros", "USMLE Bros Add Content", "USMLE Bros Upload", "USMLE Bros Add Content Page", "USMLE Bros Upload Page"]
}


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