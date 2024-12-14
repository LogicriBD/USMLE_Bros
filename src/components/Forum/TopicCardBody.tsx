"use client";
import { TopicType } from "@/database/repository/Topic"
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { ModalName } from "@/utils/enums/ModalEnum";
import { Roles } from "@/utils/enums/Roles";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

type Props = {
    topic: TopicType
}
const TopicCardBody = (props: Props) => {

    const dispatch = useAppDispatch();
    const role = useAppSelector((state) => state.user.role);
    const isAdminRole = role === Roles.Admin;
    const pathname = usePathname();
    const navigate = useNavigate();

    return (
        <div className="w-full p-3 flex flex-col space-y-2 bg-gray-200 ">
            <div className="w-full  flex-row flex justify-between items-center">
                <div className="text-marrow-dark text-md px-2 flex flex-row space-x-2">
                    {isAdminRole && pathname.includes("admin") && (
                        <div className="flex items-center ">
                            <FontAwesomeIcon
                                title="Create New SubTopic"
                                icon={faPlusCircle}
                                className="text-xl text-marrow-dark cursor-pointer"
                                onClick={() => {
                                    dispatch(modalActions.addModal({
                                        type: ModalName.CreateDiscussion,
                                        data: {
                                            parentId: props.topic.id,
                                            level: 2,
                                        },
                                    }));
                                }}
                            />
                        </div>
                    )}
                    <div 
                        onClick={(e) => {
                            e.preventDefault();
                            const level = props.topic.level ?? 0;
                            if(!pathname.includes("admin") && level !== 0){
                                navigate(`/forum/${props.topic.id}/${level}`);
                            }
                        }}
                        className="flex flex-col hover:text-teal-500 cursor-pointer transition-all duration-300">
                        <span className="font-semibold"> {props.topic.title}</span>
                        <span className="text-sm">{props.topic.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicCardBody;