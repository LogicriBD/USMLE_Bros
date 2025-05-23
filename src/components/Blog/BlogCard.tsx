import { BlogMetadata } from "@/database/repository/Blog";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { Image } from "react-bootstrap";

type Props = BlogMetadata & {
}
const BlogCard = (props: Props) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNavigate = (id: string) => {
        dispatch(loaderActions.turnOn());
        navigate(`/blog/${id}`);
    }
    return (
        <div
            onClick={() => handleNavigate(props.id??'')}
            className="w-full h-full max-w-xs flex flex-col shadow-md rounded-md overflow-hidden cursor-pointer">
            <div className="max-h-56">
                <Image
                    src={props.imageUrl}
                    alt={props.title}
                    fluid
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 bg-gray-50">
                <p className="text-gray-600 text-xs mb-1">{formatFirebaseDate(props.createdAt)}</p>
                <p className="text-gray-500 text-sm mb-2">by {props.userName}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300">
                    {props.title}
                </h3>

            </div>
        </div>
    );
}

export default BlogCard;