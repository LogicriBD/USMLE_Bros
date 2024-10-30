import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { ModalName } from "@/utils/enums/ModalEnum";
import { Roles } from "@/utils/enums/Roles";
import { IoMdLogOut } from "react-icons/io";


import { usePathname } from "next/navigation";
import NavItem, { InactiveNavItem } from "./NavItem";

const AdminItems = () =>
{
    const pathName = usePathname();
    const isAdminPath = pathName.includes("/admin");

    if (!isAdminPath)
    {
        return (<NavItem url={"/admin"} cached>Admin</NavItem>)
    }
    else
    {
        return (
            <>
                <NavItem url={"/admin"} cached>Users</NavItem>
                <NavItem url={"/admin/upload"} cached>Upload</NavItem>
            </>
        )
    }
}

const NavbarItems = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const role = useAppSelector((state) => state.user.role);
    const isAdminRole = role === Roles.Admin;

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
            <>
                <NavItem opensModal modalType={ModalName.Login}>Login</NavItem>
                <NavItem opensModal modalType={ModalName.SignUp}>Register</NavItem>
            </>
        )
    }
    else
    {
        return (
            <>
                {isAdminRole && (
                    <>
                        <NavItem url={"/"}>Home</NavItem>
                        <AdminItems />
                    </>
                )}
                <div
                    onClick={handleLogout}
                    className={`${InactiveNavItem} flex`}>
                    <div className="px-2 py-1">
                        <IoMdLogOut />
                    </div>
                    Logout
                </div>
            </>
        )
    }
}

export default NavbarItems;