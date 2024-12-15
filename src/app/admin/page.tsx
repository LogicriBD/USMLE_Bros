import UserTable from "@/src/components/Users/UserTable";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Admin User Page",
    description: "Manage Users by Switching Roles and Deleting User Accounts for Monitoring",
    authors: [{
        name: "USMLE Bros",
        url: "https://usmlebros.com/",
    }, {
        name: "RobustTech BD",
        url: "https://robustechbd.com/"
    }],
    icons: [
        {
            href: "/logos/icon.png",
            sizes: "192x192",
            type: "image/png",
            url: "/logos/icon.png",
        },
    ],
    keywords: ["USMLE", "Bros", "Admin", "User", "Manage", "Switch Roles", "Delete User", "User Management", "USMLE Bros Admin", "USMLE Bros User Management", "USMLE Bros Admin User Page"]
}

const AdminPage = () =>
{

    return (
        <div className="w-full h-full p-2 flex justify-center items-center overflow-x-auto">
            <UserTable />
        </div>
    )
}

export default AdminPage;