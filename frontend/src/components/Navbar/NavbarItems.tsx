import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { ModalName } from "@/utils/enums/ModalEnum";
import { Roles } from "@/utils/enums/Roles";

import { usePathname, useRouter } from "next/navigation";

const AdminItems = () =>
{
    const pathName = usePathname();
    const router = useRouter();
    const isAdminPath = pathName.includes("/admin");
    const dispatch = useAppDispatch();
    const navigate = (url: string) =>
    {
        dispatch(loaderActions.turnOn());
        router.push(url);
    }

    if (!isAdminPath)
    {
        return (<div
            onClick={() => navigate("/admin")}
            className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
        >Admin</div>)
    }
    else
    {
        return (<div
            onClick={() => navigate("/")}
            className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">
            Home</div>)
    }
}

const AdminUploadItems = () =>
{
    const pathName = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdminUploadPath = pathName.includes("/admin/upload");
    const navigate = (url: string) =>
    {
        dispatch(loaderActions.turnOn());
        router.push(url);
    }

    if (!isAdminUploadPath)
    {
        return (
            <div
                onClick={() => navigate("/admin/upload")}
                className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
            >
                Upload
            </div>
        )
    }
    else
    {
        return (
            <div
                onClick={() => navigate("/admin")}
                className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
            >
                Users
            </div>
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
                <div
                    onClick={() => dispatch(modalActions.updateModalType(ModalName.Login))}
                    className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">Login</div>
                <div
                    onClick={() => dispatch(modalActions.updateModalType(ModalName.SignUp))}
                    className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">Register</div>
            </>
        )
    }
    else
    {
        return (
            <>
                <div
                    onClick={handleLogout}
                    className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">Logout</div>
                {isAdminRole && (
                    <>
                        <AdminItems />
                        <AdminUploadItems />
                    </>
                )}
            </>
        )
    }
}

export default NavbarItems;