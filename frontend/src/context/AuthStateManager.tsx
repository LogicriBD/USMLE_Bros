'use client'

import { getCurrentUser, isUserLoggedIn } from "@/database/config/auth";
import { authActions } from "./store/slices/auth-slice";
import { useAppDispatch } from "./store/hooks";
import { useEffect, useState } from "react";
import Loading from "../app/loading";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    useEffect(() =>
    {
        setLoading(true);
        const isUserActive = isUserLoggedIn();
        console.log(isUserActive, getCurrentUser());
        if (!isUserActive)
        {
            dispatch(authActions.logout());
        } else
        {
            dispatch(authActions.setSessionStatus(true));
        }
        setLoading(false);
    }, [dispatch]);

    if (loading)
    {
        return (
            <Loading />
        )
    }

    return <>{children}</>;
}

export default AuthStateManager;