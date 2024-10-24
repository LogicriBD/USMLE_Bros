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
                                        className="text-gray-100 bg-sky-900 hover:bg-sky-700 cursor-pointer font-bold md:text-md text-sm rounded-md md:px-4 px-2 py-2 transition duration-300 mb-1"
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
                                        className="text-sky-900 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold md:text-md text-sm rounded-md md:px-4 px-2 py-2 transition duration-300"
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