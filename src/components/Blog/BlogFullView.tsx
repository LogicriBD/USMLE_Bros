import { FetchBlogMetadataById } from "@/actions/blog/FetchBlogMetadataById";
import { BlogData, BlogMetadata } from "@/database/repository/Blog";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { Image } from "react-bootstrap";
import ParseHTMLContent from "../Content/ParseHTMLContent";
import { FetchBlogByMetadata } from "@/actions/blog/FetchBlogByMetadata";

type Props = {
    id: string;
}
const BlogFullView = async (props:Props) => {

    const fetchMetadata = async () : Promise<BlogMetadata | undefined> => {
        const blogMetadataAction = new FetchBlogMetadataById({id:props.id});
        const blogMetadata:BlogMetadata = await blogMetadataAction.execute();

        if(blogMetadata.id === ""){
            return undefined;
        }
        return blogMetadata;
    }

    const blogMetadata = await fetchMetadata();

    const fetchBlog = async() : Promise<BlogData> => {
        const blogActions = new FetchBlogByMetadata({id:props.id});
        const blog:BlogData = await blogActions.execute();

        return blog;
    }

    const blog = await fetchBlog();

    return(
        <div className="w-full min-h-full h-fit flex flex-col items-center">
            <div className="w-full lg:w-5/6 h-full min-h-full flex flex-col">
                <div className="w-full flex items-center justify-center p-3 md:text-5xl text-3xl text-white font-bold">
                    {blogMetadata?.title}
                </div>
                <div className="w-full pt-4 flex lg:flex-row flex-col">
                    <div className="flex lg:w-3/4 w-full">
                        <Image
                            src={blogMetadata?.imageUrl}
                            alt={blogMetadata?.title}
                            fluid
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="w-full py-6 pl-6 pr-2 justify-center md:text-2xl text-xl flex flex-col lg:w-1/4 bg-gray-200">
                        <div className="w-full p-2 text-marrow-dark font-bold">Posted By</div>
                        <div className="w-full p-2 text-black font-semibold">
                            {blogMetadata?.userName}
                        </div>
                        <div className="w-full p-2 text-marrow-dark md:text-xl text-lg text-gray-700 font-normal">
                            {blogMetadata?.createdAt && formatFirebaseDate(blogMetadata.createdAt, true)}
                        </div>
                    </div>
                </div>
                <div className="w-full py-4 px-3 h-full bg-opacity-50 bg-white text-black">
                    <ParseHTMLContent id={props.id} content={blog.content} />
                </div>
            </div>
        </div>
    );
}

export default BlogFullView;