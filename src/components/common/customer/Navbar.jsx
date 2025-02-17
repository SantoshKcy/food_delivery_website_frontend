import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { VscHeart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => navigate("/login");
    const handleSignUpClick = () => navigate("/register");

    return (
        <div className="bg-white shadow-lg text-black">
            <div className="flex justify-between items-center p-3 max-w-7xl mx-auto">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <img src="/src/assets/images/logo.png" alt="Hunger End Logo" className="h-9" />
                    <span className="text-lg font-bold text-[#ff7918] hover:text-[#e66c1f] transition duration-300">Hunger End</span>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <a href="#home" className="text-lg hover:text-[#ff7918] transition duration-300">Home</a>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-lg hover:text-[#ff7918] transition duration-300">Categories</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><a href="#">Category 1</a></DropdownMenuItem>
                            <DropdownMenuItem><a href="#">Category 2</a></DropdownMenuItem>
                            <DropdownMenuItem><a href="#">Category 3</a></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-lg hover:text-[#ff7918] transition duration-300">Restaurants</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><a href="#">Restaurant 1</a></DropdownMenuItem>
                            <DropdownMenuItem><a href="#">Restaurant 2</a></DropdownMenuItem>
                            <DropdownMenuItem><a href="#">Restaurant 3</a></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>



                    {/* Search Bar */}
                    <div className="flex items-center bg-gray-200 p-2 rounded-lg w-96 shadow-sm">
                        <Search className="text-gray-600" size={20} />
                        <input
                            type="text"
                            placeholder="Search foods and restaurants...."

                            className="ml-2 bg-transparent outline-none w-full text-gray-600 placeholder-gray-600"
                        />
                    </div>

                </div>

                {/* Icons & Buttons */}
                <div className="flex items-center space-x-6">
                    <a href="#favourites" className="text-2xl"><VscHeart /></a>
                    <a href="#cart" className="text-2xl"><FaShoppingCart /></a>
                    <Button variant="outline" className="text-[#ff7918] border-[#ff7918] hover:bg-[#ff7918] hover:text-white" onClick={handleSignUpClick}>Sign Up</Button>
                    <Button className="bg-[#ff7918] text-white hover:bg-[#e66c1f]" onClick={handleSignInClick}>Sign In</Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
