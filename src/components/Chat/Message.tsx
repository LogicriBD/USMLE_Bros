import { UserData } from "@/database/repository/User";
import { ReceiveMessage } from "@/types/Message";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";

type Props = {
    message: ReceiveMessage;
    user: UserData;
}

const MessageUI = (props: Props) => {
    const isUserMessage = props.message.userId === props.user.id;

    return (
        <div className={`flex w-full ${isUserMessage ? "justify-end" : "justify-start"} py-2 `}>
            <div className="flex flex-col space-y-1">
                <div className="text-xs text-sky-900 text-start">{formatFirebaseDate(new Date(props.message.time))}</div>
                <div
                    className={`flex flex-col max-w-3/4 ${isUserMessage ? "bg-sky-700 text-white" : "bg-gray-300 text-black"} 
                rounded-lg p-3 space-y-1`}
                >
                    <div className="flex items-center justify-between text-xs">
                        <div className="font-semibold">{props.message.userName}</div>
                    </div>

                    <div className="text-sm break-words">
                        {props.message.text}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageUI;
