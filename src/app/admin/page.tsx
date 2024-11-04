import UserTable from "@/src/components/Users/UserTable";

const AdminPage = () =>
{

    return (
        <div className="md:w-full max-w-screen h-full p-10 p-2 mb-20 flex justify-center items-center overflow-x-auto">
            <UserTable />
        </div>
    )
}

export default AdminPage;