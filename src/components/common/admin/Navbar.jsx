import { useState } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    // Function to handle closing the dropdown
    const handleDropdownClick = () => {
        setShowDropdown(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-white shadow-md px-6 py-3 z-50">
            {/* Hunger End Logo & Text */}
            <div className="flex items-center gap-2">
                <Link to="/admin/dashboard" className="flex items-center gap-2">
                    <img src="/src/assets/images/logo.png" alt="Hunger End" className="w-10 h-8" />
                    <span className="text-lg font-semibold text-[#ff7918]">Hunger End</span>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative w-96">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full px-4 py-2 border bg-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700"
                />
                <FiSearch className="absolute top-3.5 right-4 text-gray-700" /> {/* Adjusted top value */}
            </div>

            <div className="flex items-center gap-6">
                {/* Notification Bell */}
                <div className="relative cursor-pointer">
                    <FaBell className="text-blue-500 text-xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        1
                    </span>
                </div>

                {/* Divider */}
                <span className="text-gray-500">|</span>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2"
                    >
                        <span className="text-gray-700">Hello, Santosh</span>

                        <img
                            src="/src/assets/images/restaurant.jpg"
                            alt="Profile"
                            className="w-8 h-8 rounded-full border"
                        />
                        <FaChevronDown className="text-gray-500 text-sm" />  {/* Chevron Down Icon */}
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                            <ul className="text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link to="/admin/setting" onClick={handleDropdownClick}>
                                        Setting
                                    </Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDropdownClick}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
