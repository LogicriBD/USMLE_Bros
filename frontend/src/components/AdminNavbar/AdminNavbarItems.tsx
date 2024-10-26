"use client"

import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { usePathname, useRouter } from "next/navigation";

const AdminNavbarItems = () => {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = async () => {
        const userLogoutAction = new UserLogoutAction();
        await userLogoutAction.execute();
        router.push("/");
    }

    return (
        <>
            <div
                onClick={handleLogout}
                className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">Logout</div>
            {!pathname.includes("/admin") ? (
                <div
                    onClick={() => router.push("/admin")}
                    className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                >Admin</div>
            ) : (
                <div
                    onClick={() => router.push("/")}
                    className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300">
                    Home</div>
            )
            }
            {!pathname.includes("/admin/upload") ? (
                <div
                    onClick={() => router.push("/admin/upload")}
                    className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                >
                    Upload
                </div>
            ) : (
                <div
                    onClick={() => router.push("/admin")}
                    className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300"
                >
                    Users
                </div>
            )}

        </>
    );
}

export default AdminNavbarItems;