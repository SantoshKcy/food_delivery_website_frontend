import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { VscHeart } from "react-icons/vsc";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

    const handleLogout = () => {
        confirmAlert({
            title: "Confirm Logout",
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        localStorage.clear();
                        setIsAuthenticated(false);
                        window.location.href = "/"; // Redirect to login page
                    },
                },
                {
                    label: "No", // Do nothing if user cancels
                },
            ],
        });
    };

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleSignInClick = () => navigate("/login");
    const handleSignUpClick = () => navigate("/register");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Redirect to the search results page with the search query as a URL parameter
            navigate(`/searchresult?query=${searchQuery}`);
        }
    };

    const activeLinkStyle = ({ isActive }) =>
        isActive ? "text-[#ff7918] border-b-2 border-[#ff7918] transition duration-300" : "text-base hover:text-[#ff7918] transition duration-300";

    return (
        <div className="bg-white shadow-lg text-black sticky w-full top-0 left-0 z-50">
            <div className="flex justify-between items-center p-3 max-w-7xl mx-auto">
                {/* Logo Section */}
                <a href="/" className="flex items-center space-x-2 ml-10">
                    <img src="/src/assets/images/logo.png" alt="Hunger End Logo" className="h-7" />
                    <span className="text-lg font-bold text-[#ff7918] hover:text-[#e66c1f] transition duration-300">Hunger End</span>
                </a>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <NavLink to="/" className={activeLinkStyle}>Home</NavLink>
                    <NavLink to="/menu" className={activeLinkStyle}>Menu</NavLink>
                    <NavLink to="/about-us" className={activeLinkStyle}>About</NavLink>

                    {/* Search Bar */}
                    <div className="flex items-center bg-gray-200 p-2 rounded-lg w-80 shadow-sm">
                        <input
                            type="text"
                            placeholder="Search foods"
                            className="ml-2 bg-transparent outline-none w-full text-gray-600 placeholder-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                        />
                        <button onClick={handleSearch} className="text-gray-600 ml-2">
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Icons & Buttons */}
                <div className="flex items-center space-x-6 mr-10">
                    <Link to="/wishlist" className="text-2xl"><VscHeart /></Link>
                    <Link to="/cart" className="text-2xl"><ShoppingCart /></Link>

                    {isAuthenticated ? (
                        <>
                            {/* My Account Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="bg-white text-black text-base hover:text-[#ff7918] px-4 py-2"
                                >
                                    My Account
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                        <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <User className="w-4 h-4 mr-2" />
                                            My Profile
                                        </Link>
                                        <Link to="/my-orders" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            My Orders
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Log Out Button */}
                            <button
                                className="bg-white text-black text-base hover:text-[#ff7918] px-4 py-2"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Sign In & Sign Up Buttons */}
                            <button
                                className="text-[#ff7918] text-base border border-[#ff7918] px-4 py-2 rounded-md hover:bg-[#ff7918] hover:text-white transition duration-300"
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                            <button
                                className="text-white bg-[#ff7918] text-base border border-[#ff7918] px-4 py-2 rounded-md hover:bg-[#e66c1f] transition duration-300"
                                onClick={handleSignUpClick}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
