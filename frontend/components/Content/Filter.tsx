import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FilterProps = {
    categories: string[];
};

const Filter = (props: FilterProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-center">
                <div className="relative w-1/2">
                    <input
                        type="text"
                        className="w-full p-2 px-4 border border-gray-400 bg-stone-200 hover:bg-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-10"
                        placeholder="Search"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex space-x-4 flex-row mt-4">
                    {props.categories.map((category, index) => (
                        <div
                            key={index}
                            className={`text-sky-100 bg-indigo-700 hover:bg-indigo-800 focus:bg-sky-300 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center
                            ${index === 3 ? 'hidden md:block' : ''} 
                            ${index === 2 ? 'hidden sm:block md:block' : ''} 
                            ${index === 1 ? 'hidden block sm:block' : ''}`} 
                        >
                            {category}
                        </div>
                    ))}
                    <div className="text-sky-100 bg-indigo-700 focus:bg-sky-300 hover:bg-indigo-800 focus:text-indigo-700 cursor-pointer font-bold text-sm rounded-full px-4 py-2 text-center">
                        All
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;