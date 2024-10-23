'use client'

import { isUserLoggedIn } from "@/database/config/auth";
import { useDispatch } from "react-redux";
import { authActions } from "./store/slices/auth-slice";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useDispatch();
    const isUserActive = isUserLoggedIn();
    if (!isUserActive)
    {
        dispatch(authActions.logout());
    }
    else
    {
        dispatch(authActions.setSessionStatus(true));
    }

    return (
        <>
            {children}
        </>
    );
}

export default AuthStateManager;