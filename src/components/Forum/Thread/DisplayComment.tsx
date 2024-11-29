import { CommentType } from "@/database/repository/Post"
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    comment: CommentType;
}

const DisplayComment = (props: Props) => {
    return (
        <div
            key={props.comment.id}
            className="flex flex-col space-y-1 bg-gray-100 p-3 rounded-md shadow-sm"
        >
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-teal-600"
                    />
                    <span>{props.comment.userName}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FontAwesomeIcon
                        icon={faClock}
                        className="text-teal-600"
                    />
                    <span>{formatFirebaseDate(props.comment.createdAt, true)}</span>
                </div>
            </div>
            <p className="text-gray-700 text-sm">
                {props.comment.content}
            </p>
        </div>
    )
}

export default DisplayComment;