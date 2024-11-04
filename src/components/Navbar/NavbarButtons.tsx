import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { usePathname } from "next/navigation";
import NavItem, { InactiveModalItem } from "./NavItem";
import { IoMdLogOut } from "react-icons/io";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { UserLogoutAction } from "@/actions/user/UserLogoutAction";

const NavbarButtons = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const pathname = usePathname();
    const isAuthenticationPath = pathname.includes("/authentication");
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
        if (isAuthenticationPath)
        {
            return (
                <div className="flex md:flex-row flex-col mt-2 md:mt-0 gap-3 mx-2 px-2">
                    <NavItem isButton url={"/"}>Home</NavItem>
                </div>
            )
        }
        else
        {
            return (
                <div className="flex md:flex-row flex-col mt-2 md:mt-0 gap-3 mx-2 px-2">
                    <NavItem isButton url={"authentication/login"}>Login</NavItem>
                    <NavItem isButton url={"authentication/register"}>Register</NavItem>
                </div>
            )
        }
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