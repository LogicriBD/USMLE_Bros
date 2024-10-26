import { faCaretDown, faCaretUp, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
type Props = {
    categories: string[];
}
const SideBar = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:w-64 w-full bg-gray-800 text-white md:min-h-screen min-h-0">
            <div className="px-6 py-3 font-bold text-xl border-b border-gray-700 flex justify-between">
                Categories

                <span className="md:hidden text-white cursor-pointer">
                    {isOpen ? (
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            className="ml-2"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    )}
                </span>
            </div>

            <ul
                className={`${isOpen ? "scale-y-100 max-h-screen" : "scale-y-0 max-h-0 md:scale-y-100 md:max-h-screen"} 
                transform transition-all duration-500 ease-in-out origin-top overflow-hidden mb-0`}
            >
                <li className="border-b border-gray-700">
                    <button className="p-2 w-full flex items-center bg-gray-200 text-sky-800 text-md font-semibold hover:bg-gray-700 hover:text-sky-200 transition">
                        <span>Create New Category</span>
                        <span>
                            <FontAwesomeIcon icon={faPlusCircle} className="ml-2 text-lg" />
                        </span>
                    </button>
                </li>
                {props.categories.map((item, index) => (
                    <li key={index} className="border-b border-gray-700">
                        <button
                            className="w-full text-left px-6 py-3 hover:bg-gray-600 transition"
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;