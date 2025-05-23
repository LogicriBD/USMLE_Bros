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
import Image from "next/image";
import { useAppDispatch } from "@/src/context/store/hooks";
import { deleteActions } from "@/src/context/store/slices/delete-slice";
import { logger } from "@/utils/Logger";

type Props = {
    message: ReceiveMessage;
    user: UserData;
}

const MessageUI = (props: Props) =>
{
    const isUserMessage = props.message.userId === props.user.id;

    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const options = {
        replace: (node) =>
        {
            if (node.name === 'a')
            {
                const { href } = node.attribs;
                return (
                    <A href={href}>
                        {domToReact(node.children)}
                    </A>
                );
            }
        },
    }

    const deleteMessage = async () =>
    {
        try
        {
            logger.log(true);
            const deleteAction = new DeleteMessage({ messageId: props.message.id });
            await deleteAction.execute();
            dispatch(deleteActions.deleteMessage({ messageId: props.message.id, isDeleted: true }));
        } catch (error: any)
        {
            logger.error(error);
        } finally
        {
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
                    <div className="text-xs text-sky-900 text-start">{formatFirebaseDate(new Date(props.message.time), true)}</div>
                    <div
                        className={`flex flex-col max-w-3/4 ${isUserMessage ? "bg-sky-700 text-white" : "bg-gray-300 text-black"} 
                    rounded-lg p-3 space-y-1`}
                    >
                        <div className="flex items-center justify-between space-x-2 text-xs">
                            <div className="font-bold">{isUserMessage ? "You" : props.message.userName}</div>
                            {isUserMessage && (
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-xl hover:scale-125 duration-300 transition"
                                    onClick={deleteMessage}
                                />
                            )}
                        </div>

                        {props.message.text && (
                            <div className="text-sm break-words tablet:max-w-2xl md:max-w-xl max-w-full">
                                {parse(props.message.text, options)}
                            </div>
                        )}
                        {props.message.imageUrl && (
                            <div className="p-2 max-w-lg max-h-lg">
                                <Image
                                    src={props.message.imageUrl}
                                    alt="message"
                                    className="w-fit h-fit object-cover"
                                    width={500}
                                    height={500}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageUI;
