"use client"
import { UserData } from "@/database/repository/User";
import parse, { domToReact } from 'html-react-parser';
import { ReceiveMessage } from "@/types/Message";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import { A } from "../CustomStyle/Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteMessage } from "@/actions/chat/deleteMessage";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAppSelector } from "@/src/context/store/hooks";
import { Roles } from "@/utils/enums/Roles";

type Props = {
    message: ReceiveMessage;
    user: UserData;
}

const MessageUI = (props: Props) => {
    const isUserMessage = props.message.userId === props.user.id;

    const [loading, setLoading] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);

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

    const deleteMessage = async () => {
        try {
            setLoading(true);
            const deleteAction = new DeleteMessage({ messageId: props.message.id });
            await deleteAction.execute();
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`flex w-full ${isUserMessage ? "justify-end" : "justify-start"} py-2 `}>
            {loading ? (
                <>
                    <Spinner animation="border" variant="primary" />
                </>
            ) : (
                <div className="flex flex-col space-y-1 ">
                    <div className="text-xs text-sky-900 text-start">{formatFirebaseDate(new Date(props.message.time))}</div>
                    <div
                        className={`flex flex-col max-w-3/4 ${isUserMessage ? "bg-sky-700 text-white" : "bg-gray-300 text-black"} 
                    rounded-lg p-3 space-y-1`}
                    >
                        <div className="flex items-center justify-between text-xs">
                            <div className="font-bold">{isUserMessage ? "You" : props.message.userName}</div>
                            {(isUserMessage || user.role === Roles.Admin ) && (
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-xl hover:scale-125 duration-300 transition"
                                    onClick={deleteMessage}
                                />
                            )}
                        </div>

                        <div className="text-sm break-words tablet:max-w-2xl md:max-w-xl max-w-full">
                            {parse(props.message.text, options)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageUI;
