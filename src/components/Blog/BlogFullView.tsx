import { Blog } from "@/database/repository/Blog";

type Props = {
    id: string;
}
const BlogFullView = async (props:Props) => {

    const fetchItems = async () : Promise<Blog[] | undefined> => {

    }

    return(
        <div className="w-full h-full flex flex-col justify-center">

        </div>
    );
}

export default BlogFullView;