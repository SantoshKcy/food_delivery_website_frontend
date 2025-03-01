import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto grid grid-cols-5 md:grid-cols-4 gap-8">
                {/* Logo and About Section */}
                <div className='ml-20'>
                    <h2 className="text-2xl font-bold flex items-center space-x-5">
                        <img
                            src="/src/assets/images/logo.png"
                            alt="Hunger End Logo"
                            className="w-8 h-8"
                        />
                        <span>HUNGER END</span>
                    </h2>
                    <p className="mt-4 text-gray-400">
                        At Hunger End, we bring you delicious meals straight from our kitchen to your doorstep, ensuring fresh and flavorful experiences every time.
                    </p>

                    {/* <div className="flex space-x-4 mt-4">
                        <a
                            href="#"
                            className="flex items-center justify-center w-32 h-10 bg-gray-800 rounded-md hover:bg-gray-700"
                        >
                            GET IT ON <span className="ml-2 font-bold">Google Play</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-center w-32 h-10 bg-gray-800 rounded-md hover:bg-gray-700"
                        >
                            Download on <span className="ml-2 font-bold">App Store</span>
                        </a>
                    </div> */}
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/about-us" className="text-gray-400 hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/contact-us" className="text-gray-400 hover:underline">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="/delivery-charges" className="text-gray-400 hover:underline">
                                Delivery Charges
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Other Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Other Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/privacy-and-policy" className="text-gray-400 hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/terms-and-conditions" className="text-gray-400 hover:underline">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="/refund-policy" className="text-gray-400 hover:underline">
                                Refund Policy
                            </a>
                        </li>
                        <li>
                            <a href="/cancellation-policy" className="text-gray-400 hover:underline">
                                Cancellation Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <a href="mailto:hungerend@gmail.com" className="hover:underline">
                                hungerend@gmail.com
                            </a>
                        </li>
                        <li>01-576231, 01-311892</li>
                        <li>Baneshwor-08, KTM</li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://www.facebook.com/profile.php?id=61572936887262" className="text-gray-400 hover:text-blue-500">
                            <FaFacebook className="text-xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/santosh-kc-53a748247/" className="text-gray-400 hover:text-blue-700">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://x.com/santoshkc2060" className="text-gray-400 hover:text-blue-400">
                            <FaXTwitter className="text-xl" />
                        </a>
                        <a href="https://www.instagram.com/santosh_kcy/" className="text-gray-400 hover:text-pink-500">
                            <FaInstagram className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
                Copyright © 2024 Hunger End | All Rights Reserved
            </div>
        </footer>
    );
};

export default Footer;
