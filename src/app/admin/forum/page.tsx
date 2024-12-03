import ForumAdminMain from "@/src/components/Forum/ForumAdminMain";
import ForumSideBar from "@/src/components/Forum/ForumSideBar";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Forums",
    description: "Create a forum or add to forum on USMLE Bros as Admin",
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
    keywords: ["USMLE", "Bros", "Forum", "Create Forum", "Add to Forum", "Add to Forum on USMLE Bros", "USMLE Bros Add to Forum", "USMLE Bros Forum", "USMLE Bros Add to Forum Page", "USMLE Bros Forum Page"]
}

const ForumAdminPage = () =>
{
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