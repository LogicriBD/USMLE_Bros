/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchBlogMetadataById } from "@/actions/blog/FetchBlogMetadataById";
import BlogFullView from "@/src/components/Blog/BlogFullView";
import { Props } from "@/types/Metadata";
import { ResolvingMetadata } from "next";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";

export async function generateMetadata({ params, searchParams }: Props,
    parent: ResolvingMetadata)
{
    const id = (await params).id
    const fetchBlogMetadataById = new FetchBlogMetadataById({ id });
    const blog = await fetchBlogMetadataById.execute();
    if (!blog)
    {
        throw new Error("Could not fetch metadata");
    }

    return {
        title: `USMLE Bros | Content - ${blog.title}`,
        description: `Learn about ${blog.title}, containing information about ${blog.category} by ${blog.userName}`,
        openGraph: {
            images: [blog?.imageUrl],
        },
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
        keywords: [blog.title, "USMLE", "Bros", "Content", "USMLE Bros Content", "USMLE Bros Content Page", "USMLE Bros Content Display", "USMLE Bros Content Page", "USMLE Bros Content Display Page", blog.category, blog.userName]
    }
}

const BlogLoading = () =>
{
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

const BlogPage = async ({ params }: { params: { id: string } }) =>
{
    const id = params.id;
    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogFullView id={id} />
        </Suspense>
    )
}

export default BlogPage;