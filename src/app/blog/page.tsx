import BlogView from "@/src/components/Blog/BlogView";

const BlogPage = () => {
    return(
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="md:text-5xl text-3xl text-white p-2 font-bold flex justify-center items-center">Blog</h1>
            <div className="flex md:w-3/4 w-full items-center justify-center">
                <BlogView />
            </div>
        </div>
    );
}

export default BlogPage;