'use client'

import { isUserLoggedIn } from "@/database/config/auth";
import { authActions } from "./store/slices/auth-slice";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isUserActive = isUserLoggedIn();
        if (!isUserActive) {
            dispatch(authActions.logout());
        } else {
            dispatch(authActions.setSessionStatus(true));
        }
    }, [dispatch]);

    return <>{children}</>;
}

export default AuthStateManager;