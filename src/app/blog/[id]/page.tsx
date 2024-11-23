import BlogFullView from "@/src/components/Blog/BlogFullView";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";

const BlogLoading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

const BlogPage = async ({ params }: { params: { id: string } }) =>{
    const id = params.id;
    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogFullView id={id} />
        </Suspense>
    )
}

export default BlogPage;