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
    const router = useRouter();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isAuthLoading = useAppSelector((state) => state.loader.authLoading);
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        dispatch(loaderActions.authTurnOn());
        validateUserSession();
        if (isLoggedIn === false)
        {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

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