import BlogMetadataView from "@/src/components/Blog/BlogMetadataView";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Blogs",
    description: "USMLE Bros blogs containing information about USMLE related topics and exam preparation",
    authors: [{
        name: "USMLE Bros",
        url: "https://usmlebros.com/",
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
    keywords: ["USMLE", "Bros", "Blogs", "USMLE Blogs", "USMLE Bros Blogs", "View Blog", "Medical Blog", "USMLE Blog", "USMLE Bros Blog", "USMLE Bros Blog Page"]
}

const BlogPage = () =>
{
    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="md:text-5xl text-3xl text-white p-2 font-bold flex justify-center items-center">Blog</h1>
            <div className="flex md:w-3/4 w-full items-center justify-center">
                <BlogMetadataView />
            </div>
        </div>
    );
}

export default BlogPage;