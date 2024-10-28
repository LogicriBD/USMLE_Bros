import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";

import { useRouter } from "next/navigation";

const NavbarItems = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    const router = useRouter();


    const handleLogout = async () =>
    {
        const userLogoutAction = new UserLogoutAction();
        await userLogoutAction.execute();
        router.push("/");
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
            </>
        )
    }
}

export default NavbarItems;