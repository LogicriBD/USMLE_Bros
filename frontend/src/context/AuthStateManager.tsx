'use client'

import { validateUserSession } from "@/database/config/auth";
import { useAppDispatch } from "./store/hooks";
import { loaderActions } from "./store/slices/loader-slice";

const AuthStateManager = ({
    children
}: {
    children: React.ReactNode
}) =>
{
    const dispatch = useAppDispatch();
    dispatch(loaderActions.authTurnOn());
    validateUserSession();

    return <>{children}</>;
}

export default AuthStateManager;