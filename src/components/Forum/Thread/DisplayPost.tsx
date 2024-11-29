import { PostType } from "@/database/repository/Post"
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    post: PostType;
}
const DisplayPost = (props: Props) => {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-100 rounded-t-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-teal-600 text-lg"
                    />
                    <span className="font-medium text-sm">{props.post.userName}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faClock} className="text-teal-600" />
                    <span>{formatFirebaseDate(props.post.createdAt, true)}</span>
                </div>
            </div>

            <div className="p-4">
                <p className="text-gray-800 text-md leading-relaxed whitespace-pre-wrap">
                    {props.post.content}
                </p>
            </div>

            <div className="px-4 py-2 border-t border-gray-100 bg-gray-100 rounded-b-lg flex justify-end">
                <button
                    className="text-sm bg-marrow-dark font-semibold rounded-lg text-gray-100 hover:scale-105 py-2 px-3 transition duration-300"
                    onClick={() => alert("Feature not implemented yet!")}
                >
                    Reply
                </button>
            </div>
        </div>
    );
};

export default DisplayPost;