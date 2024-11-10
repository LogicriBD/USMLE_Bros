import { UserData } from "@/database/repository/User";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { Roles } from "@/utils/enums/Roles";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
    user: UserData;
    isActive: boolean;
}
const UserCard = (props: Props) => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    return (
        <div className={`w-full h-min bg-stone-200 rounded-lg flex flex-col space-y-2 py-2`}>
            <div className="text-black flex items-center gap-2 font-semibold text-md px-4 ">
                {props.user.name}
                <span className="text-xs">
                    {user.id === props.user.id && "(You)"}
                    <span className="text-sky-600">{props.user.role === Roles.Admin && " (Admin)"}</span>
                </span>
                {props.isActive && (
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 border-2 border-green-500 rounded-full"></div>
                    </span>
                )}
            </div>
            {
                user.role === Roles.Admin && (
                    props.user.banExpiry && props.user.banExpiry.toDate() > new Date() ? (
                        <div className="w-full px-4">
                            <span className="text-white bg-red-500 text-sm font-normal py-1 px-2 rounded-md transition duration-300">
                                Banned
                                <FontAwesomeIcon icon={faBan} className="ml-2 text-white text-sm" />
                            </span>
                        </div>
                    ) : (
                        <div className="w-full px-4">
                            <button
                                onClick={() =>
                                    dispatch(
                                        modalActions.addModal({
                                            type: ModalName.BanModal,
                                            data: props.user,
                                        })
                                    )
                                }
                                className="text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer text-sm font-normal py-1 px-2 rounded-md transition duration-300"
                            >
                                Ban
                                <FontAwesomeIcon icon={faBan} className="ml-2 text-white text-sm" />
                            </button>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default UserCard;