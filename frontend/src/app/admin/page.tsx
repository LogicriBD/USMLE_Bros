"use client"
import UserTable from "@/src/components/Users/UserTable";
import AuthStateManager from "@/src/context/AuthStateManager"
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";

const AdminPage = () => {
    return(
        <AuthStateManager>
            <>
               <UserTable />
            </>
        </AuthStateManager>
    )
}

export default withAdminPriviledges(AdminPage);