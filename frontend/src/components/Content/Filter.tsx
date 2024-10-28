import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { logger } from "@/utils/Logger";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";

type FilterProps = {
    categories: string[];
};

const Filter = (props: FilterProps) =>
{

    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState<string>("");

    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-center">
                <div className="relative md:w-1/2 w-3/4">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full p-2 px-4 border border-gray-400 bg-stone-200 hover:bg-stone-300 transition duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-10"
                        placeholder="Search"
                    />
                    {searchText !== "" ? (
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-3 top-3 text-gray-900 cursor-pointer"
                            onClick={() => logger.log(searchText)}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex space-x-4 flex-row mt-4">
                    {props.categories.map((category, index) => (
                        <div
                            key={index}
                            className={`text-sky-100 bg-indigo-900 hover:bg-indigo-600 transition duration-300 focus:bg-sky-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center
                            ${index === 3 ? 'hidden md:block' : ''} 
                            ${index === 2 ? 'hidden sm:block md:block' : ''} 
                            ${index === 1 ? 'hidden block sm:block' : ''}`}
                        >
                            {category}
                        </div>
                    ))}
                    <div
                        onClick={() => dispatch(modalActions.updateModalType(ModalName.Categories))}
                        className="text-sky-100 bg-indigo-900 focus:bg-sky-300 hover:bg-indigo-600 transition duration-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center">
                        All
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;