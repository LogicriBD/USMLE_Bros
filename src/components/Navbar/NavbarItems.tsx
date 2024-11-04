import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { Roles } from "@/utils/enums/Roles";
import { IoMdLogOut } from "react-icons/io";


import { usePathname } from "next/navigation";
import NavItem, { InactiveModalItem } from "./NavItem";

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
    const pathname = usePathname();

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
            <div className="flex md:flex-row flex-col gap-3 mx-2 px-2">
                {pathname.includes("/authentication") && (<NavItem isButton url={"/"}>Home</NavItem>)}
                {!pathname.includes("/authentication") && (<NavItem isButton url={"authentication/login"}>Login</NavItem>)}
                {!pathname.includes("/authentication") && (<NavItem isButton url={"authentication/register"}>Register</NavItem>)}
            </div>
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
                    className={`${InactiveModalItem} flex`}>
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