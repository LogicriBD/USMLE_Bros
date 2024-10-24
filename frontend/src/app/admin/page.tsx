"use client"
import AuthStateManager from "@/src/context/AuthStateManager"
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";

const AdminPage = () => {
    return(
        <AuthStateManager>
            <h1>Admin Page</h1>
        </AuthStateManager>
    )
}

export default withAdminPriviledges(AdminPage);