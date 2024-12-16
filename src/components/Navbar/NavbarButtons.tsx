import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import NavItem, { InactiveModalItem } from "./NavItem";
import { IoMdLogOut } from "react-icons/io";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { ModalName } from "@/utils/enums/ModalEnum";

const NavbarButtons = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () =>
    {
        dispatch(loaderActions.turnOn());
        const userLogoutAction = new UserLogoutAction();
        await userLogoutAction.execute();
        navigate("/");
        dispatch(authActions.logout());
        dispatch(loaderActions.turnOff());
    }

    if (!isLoggedIn)
    {
        return (
            <div className="flex md:flex-row flex-col mt-2 md:mt-0 gap-3 mx-2 px-2">
                <NavItem isButton opensModal modalType={ModalName.AuthModal} >Sign In</NavItem>
            </div>
        )
    }
    else
    {
        return (
            <div className="flex md:flex-row flex-col mt-2 md:mt-0 gap-3 mx-2 px-2">
                <div
                    onClick={handleLogout}
                    className={`${InactiveModalItem} flex`}>
                    <div className="px-2 py-1">
                        <IoMdLogOut />
                    </div>
                    Logout
                </div>
            </div>
        )
    }
}

export default NavbarButtons;