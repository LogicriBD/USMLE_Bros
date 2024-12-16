"use client";
import { useAppSelector } from "@/src/context/store/hooks";
import UserCard from "./UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { UserFetchAll } from "@/actions/user/UserFetchAll";
import { UserData } from "@/database/repository/User";
import { logger } from "@/utils/Logger";
type Props = {
    users: UserData[];
}
const MobileSideBarContents = (props: Props) =>
{
    const currentUser = useAppSelector((state) => state.user);

    const [searchText, setSearchText] = useState<string>('');
    const [searchedUsers, setSearchedUsers] = useState<UserData[]>(props.users);

    const handleSearch = (e: any) =>
    {
        const searchText = e.target.value;
        if (searchText === '')
        {
            setSearchedUsers(props.users);
        }
        else
        {
            const searched = props.users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedUsers(searched);
        }
        setSearchText(searchText);
    }

    return (
        <>
            <div className="w-full p-2 items-center text-white md:text-xl text-lg font-bold">
                <div className="flex justify-start w-full">
                    People
                </div>
                <div className="w-full py-1 mt-2">
                    <ChatSearchBar searchText={searchText} setSearchText={handleSearch} />
                </div>
            </div>
            <div className="w-full h-full px-2 pt-2 pb-24 flex flex-col space-y-2 overflow-y-auto">
                <UserCard user={currentUser} isActive={false} />
                {searchedUsers.map((user) =>
                {
                    if (user.id !== currentUser.id)
                    {
                        return <UserCard key={user.id} user={user} isActive={false} />;
                    }
                    return null;
                })}
            </div>
        </>
    )
}

const DesktopSideBarContents = (props: Props) =>
{
    const currentUser = useAppSelector((state) => state.user);

    const [searchText, setSearchText] = useState<string>('');
    const [searchedUsers, setSearchedUsers] = useState<UserData[]>(props.users);

    const handleSearch = (e: any) =>
    {
        const searchText = e.target.value;
        if (searchText === '')
        {
            setSearchedUsers(props.users);
        }
        else
        {
            const searched = props.users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedUsers(searched);
        }
        setSearchText(searchText);
    }

    return (
        <>
            <div className="w-full p-2 items-center text-white md:text-xl text-lg font-bold flex flex-col">
                <div className="flex justify-start w-full">
                    People
                </div>
                <div className="w-full py-1 mt-2">
                    <ChatSearchBar searchText={searchText} setSearchText={handleSearch} />
                </div>
            </div>
            <div className="w-full h-full p-2 flex flex-col space-y-2 overflow-y-auto">
                <UserCard user={currentUser} isActive={false} />
                {searchedUsers.map((user) =>
                {
                    if (user.id !== currentUser.id)
                    {
                        return <UserCard key={user.id} user={user} isActive={false} />;
                    }
                    return null;
                })}
            </div>
        </>
    )
}
type SearchProps = {
    searchText: string;
    setSearchText: (e: any) => void;
}
const ChatSearchBar = (props: SearchProps) =>
{
    return (
        <div className="w-full  flex items-center">
            <div className="relative w-full">
                <input
                    type="text"
                    value={props.searchText}
                    onChange={props.setSearchText}
                    className="w-full py-2 px-4 shadow-md text-md text-gray-800 bg-stone-200 rounded-lg hover:bg-stone-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Search"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 top-3 text-gray-900 cursor-pointer"
                />
            </div>
        </div >
    )
}

const ChatSideBar = () =>
{

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const isSubmit = useAppSelector((state) => state.submit.toggle);
    const toggleSidebar = () =>
    {
        setIsOpen(!isOpen);
    };

    const fetchUsers = async () =>
    {
        try
        {
            setLoading(true);
            const userAction = new UserFetchAll();
            const res = await userAction.execute();
            setUsers(res);
        } catch (error)
        {
            logger.log(error);
        } finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        fetchUsers();
    }, [isSubmit])

    return (
        <>
            <div className="hidden w-full h-full bg-opacity-10 bg-gray-100 lg:flex lg:flex-col">
                {loading ? (
                    <Spinner invert={false} />
                ) : (
                    <DesktopSideBarContents users={users} />
                )}
            </div>
            <div
                onClick={toggleSidebar}
                className="lg:hidden bg-marrow-dark w-full h-full flex flex-col z-30 relative">
                <div className="flex justify-end p-4">
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-white cursor-pointer"
                    />
                </div>
                <div
                    className={`fixed left-0 w-screen h-full bg-marrow-dark transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300 ease-in-out z-30`}
                >
                    <div className="flex flex-col p-4 space-y-4 h-full">
                        <div className='flex justify-end px-2'>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={toggleSidebar}
                                className="text-center text-white cursor-pointer text-xl"
                            />
                        </div>
                        <div
                            onClick={(e: any) => e.stopPropagation()}
                            className="w-full h-full flex flex-col">
                            {loading ? (
                                <Spinner invert={false} />
                            ) : (
                                <MobileSideBarContents users={users} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatSideBar;