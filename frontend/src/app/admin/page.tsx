"use client"
import AuthStateManager from "@/src/context/AuthStateManager"
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";

const AdminPage = () => {
    return(
        <AuthStateManager>
            <>
                
            </>
        </AuthStateManager>
    )
}

export default withAdminPriviledges(AdminPage);