import { ComponentType } from "react";
import { Roles } from "@/utils/enums/Roles";
import { useSelector } from "react-redux";
import { AppStore } from "../context/store/redux-store";

import { useRouter } from "next/router";

const AccessDenied = () =>
{
    const router = useRouter();
    router.push("/access-denied");
    return null;
};

export function withAdminPriviledges(Component: ComponentType)
{
    return function WrappedComponent(props)
    {

        const role = useSelector((state: AppStore) => state.user.role);
        const isLoggedIn = useSelector((state: AppStore) => state.auth.isLoggedIn);

        if (!isLoggedIn || role !== Roles.Admin)
        {
            return <AccessDenied />
        }

        return <Component {...props} />;
    };
}