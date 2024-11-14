import { UserData } from "@/database/repository/User";
import parse, { domToReact } from 'html-react-parser';
import { ReceiveMessage } from "@/types/Message";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { A } from "../CustomStyle/Links";

type Props = {
    message: ReceiveMessage;
    user: UserData;
}

const MessageUI = (props: Props) => {
    const isUserMessage = props.message.userId === props.user.id;

    const options = {
        replace: (node) => {
            if (node.name === 'a') {
                const { href, children } = node.attribs;
                return (
                    <A href={href}>
                        {domToReact(node.children)}
                    </A>
                );
            }
        },
    }
    
    return (
        <div className={`flex w-full ${isUserMessage ? "justify-end" : "justify-start"} py-2 `}>
            <div className="flex flex-col space-y-1 ">
                <div className="text-xs text-sky-900 text-start">{formatFirebaseDate(new Date(props.message.time))}</div>
                <div
                    className={`flex flex-col max-w-3/4 ${isUserMessage ? "bg-sky-700 text-white" : "bg-gray-300 text-black"} 
                rounded-lg p-3 space-y-1`}
                >
                    <div className="flex items-center justify-between text-xs">
                        <div className="font-bold">{isUserMessage ? "You": props.message.userName}</div>
                    </div>

                    <div className="text-sm break-words tablet:max-w-2xl md:max-w-xl max-w-full">
                        {parse(props.message.text, options)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageUI;
