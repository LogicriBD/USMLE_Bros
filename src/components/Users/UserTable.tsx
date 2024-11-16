/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { UserFetchAll } from "@/actions/user/UserFetchAll";
import { UserData } from "@/database/repository/User";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";

const UserTable = () =>
{
    const [users, setUsers] = useState<UserData[]>([]);
    const dispatch = useAppDispatch();
    const isSubmit = useAppSelector((state) => state.submit.toggle);

    const fetchUsers = async () =>
    {
        try
        {
            dispatch(loaderActions.turnOn());
            const usersAction = new UserFetchAll();
            const users = await usersAction.execute();
            setUsers(users);
        } catch (error: any)
        {
            logger.error(error);
            dispatch(modalActions.addModal({ type: ModalName.ErrorModal, data: error }));
        } finally
        {
            dispatch(loaderActions.turnOff());
        }
    };

    useEffect(() =>
    {
        fetchUsers();
    }, [isSubmit]);

    return (
        <div className="overflow-auto w-full md:w-fit  rounded-lg h-full">
            <table className="w-full min-w-screen lg:min-w-fit lg:w-fit bg-white md:text-xl text-xs sm:text-md text-black shadow-xl md:shadow-none rounded-lg overflow-auto scrollbar-thin">
                <thead className="bg-inherit">
                    <tr>
                        <th className="p-4 hidden md:table-cell">SL</th>
                        <th className="p-4 hidden md:table-cell">Email</th>
                        <th className="p-4 hidden md:table-cell">Name</th>
                        <th className="p-4 hidden md:table-cell">Role</th>
                        <th className="p-4 md:hidden">User</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-200">
                            <td className="p-4 hidden md:table-cell">{index + 1}</td>
                            {/* Show User details in one cell for mobile view */}
                            <td className="md:hidden md:p-4 p-2">
                                <div><span className="font-bold text-marrow-dark">Serial: </span>{index + 1}</div>
                                <div><span className="font-bold text-marrow-dark">Email: </span>{user.email}</div>
                                <div><span className="font-bold text-marrow-dark">Username: </span>{user.name}</div>
                                <div><span className="font-bold text-marrow-dark">Role: </span>{user.role}</div>
                            </td>
                            {/* Show separate cells for larger screens */}
                            <td className="hidden md:table-cell p-4">{user.email}</td>
                            <td className="hidden md:table-cell p-4">{user.name}</td>
                            <td className="hidden md:table-cell p-4">{user.role}</td>
                            <td className="space-y-2 xl:space-y-0 xl:space-x-2 p-2 flex flex-col xl:flex-row w-full h-full justify-center items-center">
                                <div>
                                    <button
                                        onClick={() => dispatch(modalActions.addModal({
                                            type: ModalName.SwitchRole,
                                            data: user
                                        }))}
                                        className="text-gray-100 bg-marrow-dark hover:bg-sky-900 cursor-pointer font-bold md:text-md text-xs rounded-md md:px-4 px-2 py-2 transition duration-300"
                                    >
                                        Switch Role
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => dispatch(modalActions.addModal({
                                            type: ModalName.DeleteUser,
                                            data: user
                                        }))}
                                        className="text-gray-100 bg-marrow-light hover:bg-marrow cursor-pointer font-bold md:text-md text-xs rounded-md md:px-4 px-2 py-2 transition duration-300"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default UserTable;
