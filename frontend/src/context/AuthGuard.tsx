/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { validateUserSession } from "@/database/config/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import Loading from "../app/loading";
import { loaderActions } from "./store/slices/loader-slice";

const AuthGuard = (
    { children }: { children: React.ReactNode }
) =>
{
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);

    useEffect(() =>
    {
        dispatch(loaderActions.authTurnOn());
        validateUserSession();
    }, []);

    useEffect(() =>
    {
        if (!isLoggedIn && !isAuthLoading)
        {
            router.push("/login");
        }
    }, [isLoggedIn, isAuthLoading]);

    if (isAuthLoading)
    {
        return (
            <Loading />
        )
    }


    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;