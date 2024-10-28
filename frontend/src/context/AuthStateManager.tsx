/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { validateUserSession } from "@/database/config/auth";
import { useAppDispatch } from "./store/hooks";
import { loaderActions } from "./store/slices/loader-slice";
import { useEffect } from "react";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.authTurnOn());
        validateUserSession();
    }, [])

    return <>{children}</>;
}

export default AuthStateManager;