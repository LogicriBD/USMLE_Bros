import { Roles } from "@/utils/enums/Roles";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { useAppSelector } from "@/src/context/store/hooks";

const AdminItems = () =>
{
    const pathName = usePathname();
    const isAdminPath = pathName.includes("/admin");

    if (!isAdminPath)
    {
        return (<NavItem url={"/admin"} cached>Admin</NavItem>)
    }
    else
    {
        return (
            <>
                <NavItem url={"/admin"} cached>Users</NavItem>
                <NavItem url={"/admin/upload"} cached>Upload</NavItem>
                <NavItem url={"/admin/blog"} cached>Blog Upload</NavItem>
                <NavItem url={"/admin/forum"} cached>Create Forum</NavItem>'
                <NavItem url={"/admin/newsletter"} cached>NewsLetter</NavItem>
            </>
        )
    }
}

const NavbarItems = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const role = useAppSelector((state) => state.user.role);
    const isAdminRole = role === Roles.Admin;
    const pathname = usePathname();

    if (isLoggedIn)
    {
        return (
            <div className="flex md:flex-row flex-col gap-3 mx-2 px-2">
                <NavItem url={"/"}>{isAdminRole && pathname.includes("admin") ? "View" : "Home"}</NavItem>
                {!pathname.includes("chat") && (<NavItem url="/chat">Chat</NavItem>)}
                {isAdminRole && (<AdminItems />)}
                {!pathname.includes("blog") &&!pathname.includes("admin") && (<NavItem url="/blog">Blog</NavItem>)}
                {!pathname.includes("forum") &&!pathname.includes("admin") && (<NavItem url="/forum">Forum</NavItem>)}
            </div>
        )
    }
    else
    {
        return (
            <div className="flex md:flex-row flex-col gap-3 mx-2 px-2">
                {!pathname.includes("blog") &&!pathname.includes("admin") && (<NavItem url="/blog">Blog</NavItem>)}
                {!pathname.includes("forum") &&!pathname.includes("admin") && (<NavItem url="/forum">Forum</NavItem>)}
            </div>
        );
    }
}

export default NavbarItems;