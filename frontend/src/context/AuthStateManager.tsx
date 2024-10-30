/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { validateUserSession } from "@/database/config/auth";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loaderActions } from "./store/slices/loader-slice";
import { useEffect } from "react";
import { appStore } from "./store/redux-store";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn) || appStore.getState().auth.isLoggedIn;
    useEffect(() =>
    {
        dispatch(loaderActions.authTurnOn());
        validateUserSession();
    }, [isLoggedIn])

    return <>{children}</>;
}

export default AuthStateManager;