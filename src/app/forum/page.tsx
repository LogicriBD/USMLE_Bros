import ForumAdminMain from "@/src/components/Forum/ForumAdminMain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Forum",
    description: "View forums on USMLE Exams at USMLE Bros",
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
    keywords: ["USMLE", "Bros", "Forum", "USMLE Forum", "USMLE Bros Forum", "USMLE Bros Forum Page", "USMLE Forum Page"]
}

const ForumPage = () =>
{
    return (
        <div className="w-full h-full overflow-y-auto scrollbar-thin py-2">
            <ForumAdminMain />
        </div>
    )
}

export default ForumPage;