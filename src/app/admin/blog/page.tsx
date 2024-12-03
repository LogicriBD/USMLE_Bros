import BlogUploader from "@/src/components/Blog/BlogUploader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Create a Blog",
    description: "Create a blog post on USMLE Bros as Admin",
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
    keywords: ["USMLE", "USMLE Bros", "Blog", "Create Blog", "Create Blog on USMLE Bros", "USMLE Bros Create Blog", "USMLE Bros Blog", "USMLE Bros Create Blog Page", "USMLE Bros Blog Page"]
}

const BlogUploadPage = () =>
{
    return (
        <div className="flex flex-col w-full h-full  items-center">
            <div className="md:text-4xl text-2xl text-white font-bold flex justify-center py-2">Create a Blog</div>
            <div className="md:w-3/4 w-full h-auto flex bg-opacity-50 bg-gray-50 rounded-xl">
                <BlogUploader />
            </div>
        </div>
    )
}
export default BlogUploadPage;