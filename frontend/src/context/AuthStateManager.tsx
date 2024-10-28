'use client'

import { validateUserSession } from "@/database/config/auth";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { loaderActions } from "./store/slices/loader-slice";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        dispatch(loaderActions.authTurnOn());
        validateUserSession();
    }, [isLoggedIn]);

    return <>{children}</>;
}

export default AuthStateManager;