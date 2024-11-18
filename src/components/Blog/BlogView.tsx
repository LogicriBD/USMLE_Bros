import BlogCategories from "./BlogCategories";

const BlogView = () => {
    return(
        <div className="w-full h-full flex flex-col space-y-2">
            <BlogCategories />
            <div className="w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 overflow-y-auto scrollbar-thin p-2">
                
            </div>
        </div>
    );
}
export default BlogView;