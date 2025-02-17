import { Link } from "react-router-dom"; // Import Link component from react-router-dom
const Register = () => {



    return (
        <div className="flex justify-center items-center h-[795px] bg-gray-100">
            <div className="absolute top-8 left-14 flex items-center">
                <Link to="/" className="flex items-center"> {/* Wrap both image and text in Link */}
                    <img
                        src="/images/logo.png"
                        alt="Hunger End Logo"
                        className="w-11 mr-2" // Adjust the size of the logo
                    />
                    <span className="text-xl font-medium text-[#ff7918]">Hunger End</span>
                </Link>
                {/* <img
                    src="/images/logo.png"
                    alt="Hunger End Logo"
                    className="w-11 mr-2"  // Adjust the size of the logo
                />
                <span className="text-xl font-medium text-[#ff7918]">Hunger End</span> */}
            </div>
            <div className="bg-white p-7 rounded-2xl shadow-lg w-[30rem] max-w-lg">
                <h2 className="text-3xl font-medium text-start text-gray-800">Sign Up</h2>
                <p className="text-sm text-gray-500 text-start mb-6 mt-2">Create an account to start your food journey.</p>

                <form>
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">First Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Last Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Phone</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Confirm password"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="terms" className="mr-2" />
                        <label htmlFor="terms" className="text-sm text-gray-500">
                            I agree to the{" "}
                            <a href="#" className="text-[#ff7918] hover:underline">
                                Terms and Conditions.
                            </a>
                        </label>
                    </div>

                    <button className="w-full bg-[#ff7918] text-white font-semibold p-3 rounded-lg hover:bg-[#e86a15] transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#ff7918] font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
