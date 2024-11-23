import BlogUploader from "@/src/components/Blog/BlogUploader";

const BlogUploadPage = () => {
    return(
        <div className="flex flex-col w-full h-full  items-center">
            <div className="md:text-4xl text-2xl text-white font-bold flex justify-center py-2">Create a Blog</div>
            <div className="md:w-3/4 w-full h-auto flex bg-opacity-50 bg-gray-50 rounded-xl">
                <BlogUploader />
            </div>
        </div>
    )
}
export default BlogUploadPage;