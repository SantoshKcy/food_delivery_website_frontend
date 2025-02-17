import React, { useState } from 'react';
import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhoneAlt,
    FaTwitter,
} from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Header = () => {
    const [lightMode, setLightMode] = useState(true); // Set Light Mode as default

    const toggleLightMode = () => {
        setLightMode(!lightMode);
    };

    return (
        <header
            className={`header border-b ${lightMode ? 'border-black' : 'border-white'} flex justify-between items-center px-4 py-2`}
            style={{
                backgroundColor: lightMode ? '#fff' : '#000', // White background for light mode, black for dark mode
                color: lightMode ? '#000' : '#fff', // Black text for light mode, white for dark mode
            }}
        >
            {/* Left Section */}
            <div className="flex space-x-4 ml-16">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaFacebook className="text-xl transition-transform transform hover:scale-110" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaInstagram className="text-xl transition-transform transform hover:scale-110" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaTwitter className="text-xl transition-transform transform hover:scale-110" />
                </a>
                <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaLinkedin className="text-xl transition-transform transform hover:scale-110" />
                </a>
            </div>

            {/* Middle Section */}
            <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-xl text-orange-500" />
                <span className="text-base font-medium">{'01-7654805'}</span>
                <FaEnvelope className="text-xl text-orange-500" />
                <span className="text-base font-medium">{'hungerend@gmail.com'}</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center mr-16">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={lightMode}
                        onChange={toggleLightMode}
                    />
                    <div
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${lightMode ? 'bg-orange-500' : 'bg-gray-500'}`}
                    >
                        <div
                            className={`w-4 h-4 flex items-center justify-center bg-white rounded-full shadow-md transform transition-transform duration-300 ${lightMode ? 'translate-x-6' : 'translate-x-0'}`}
                        >
                            {lightMode ? (
                                <MdLightMode className="text-yellow-500 text-lg" />
                            ) : (
                                <MdDarkMode className="text-gray-700 text-lg" />
                            )}
                        </div>
                    </div>
                    <span className="ml-2 text-base font-medium">
                        {lightMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </label>
            </div>
        </header>
    );
};

export default Header;
