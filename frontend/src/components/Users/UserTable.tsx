"use client"
import { UserFetchAll } from "@/actions/user/UserFetchAll";
import { UserData } from "@/database/repository/User";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const UserTable = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const dispatch = useAppDispatch();
    const modalState = useAppSelector((state) => state.modal.type);

    const fetchUsers = async () => {
        try {
            dispatch(loaderActions.turnOn());
            const usersAction = new UserFetchAll();
            const users = await usersAction.execute();
            setUsers(users);
        } catch (error: any) {
            console.error(error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [modalState]);

    return (
        <div className="md:w-full w-80 h-full md:p-10 p-2 flex justify-center items-center overflow-x-auto">
            <Table
                striped
                bordered
                hover
                className="bg-inherit text-xl text-black "
                responsive="md"
            >
                <thead className="font-bold text-xl text-center">
                    <tr>
                        <th className="md:p-2">SL</th>
                        <th className="md:p-2">Email</th>
                        <th className="md:p-2">Name</th>
                        <th className="md:p-2">Role</th>
                        <th className="md:p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr>
                            <td className="md:p-2">{index + 1}</td>
                            <td className="md:p-2">{user.email}</td>
                            <td className="md:p-2">{user.name}</td>
                            <td className="md:p-2">{user.role}</td>
                            <td className="md:space-x-2 space-y-2 md:px-4 md:py-2">
                                <span>
                                    <button
                                        onClick={() => dispatch(modalActions.addModal({
                                            type: ModalName.SwitchRole,
                                            data: user
                                        }))}
                                        className="bg-indigo-500 text-white px-2 py-1 rounded-md mb-1 hover:bg-indigo-700 transition duration-300"
                                    >
                                        Switch Role
                                    </button>
                                </span>
                                <span>
                                    <button
                                        onClick={() => dispatch(modalActions.addModal({
                                            type: ModalName.DeleteUser,
                                            data: user
                                        }))}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-300"
                                    >
                                        Delete User
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;