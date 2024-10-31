import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISearchBar
{
    searchText: string;
    setSearchText: (e: any) => void;
}

const SearchBar = ({ searchText, setSearchText }: ISearchBar) =>
{

    return (
        <div className="w-full px-4 flex items-center">
            <div className="relative md:w-1/2 w-4/5">
                <input
                    type="text"
                    value={searchText}
                    onChange={setSearchText}
                    className="w-full p-2 px-4 shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-10"
                    placeholder="Search"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 top-3 text-gray-900 cursor-pointer"
                />
            </div>
        </div >
    );
}

export default SearchBar;