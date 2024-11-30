import { ComponentType } from "react";

export function withLoggedInPriviledges(Component: ComponentType)
{
    return function WrappedComponent(props)
    {


        // if (!isLoggedIn || role !== Roles.Admin)
        // {
        //     return <AccessDenied />
        // }

        return <Component {...props} />;
    };
}