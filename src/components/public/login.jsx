import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom


const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* <img
                src="/images/logo.png"
                alt="Hunger End logo"
                className="absolute top-8 left-14 w-11"  // Adjust the size and position
            /> */}
            <div className="absolute top-8 left-14 flex items-center">
                <Link to="/" className="flex items-center"> {/* Wrap both image and text in Link */}
                    <img
                        src="/images/logo.png"
                        alt="Hunger End Logo"
                        className="w-11 mr-2"  // Adjust the size of the logo
                    />
                    <span className="text-xl font-medium text-[#ff7918]">Hunger End</span>
                </Link>
                {/* <Link to='/'>
                    <img
                        src="/images/logo.png"
                        alt="Hunger End Logo"
                        className="w-11 mr-2"  // Adjust the size of the logo
                    />
                </Link>
                <span className="text-xl font-medium text-[#ff7918]">Hunger End</span> */}
            </div>
            <div className="bg-white p-7 rounded-2xl shadow-lg w-[27rem] max-w-lg">
                <h2 className="text-3xl font-medium text-start text-gray-800" >Log in</h2>
                <p className="text-sm text-gray-500 text-start mb-6 mt-2">Welcome back! sign in to start your food journey.</p>

                <form>
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


                    <div className="text-right mb-4">
                        <a href="#" className="text-[#ff7918] text-sm font-medium hover:underline">Forgot password?</a>
                    </div>

                    <button className="w-full bg-[#ff7918] text-white font-semibold p-3 rounded-lg hover:bg-[#e86a15] transition">
                        Log in
                    </button>
                </form>

                <div className="my-4 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button className="w-full flex items-center justify-center border border-gray-300 p-3 rounded-lg mb-3 hover:bg-gray-100 transition font-medium text-gray-500">
                    <FcGoogle className="mr-2 text-xl" />
                    Sign in with Google
                </button>

                <button className="w-full flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-500">
                    <FaFacebook className="mr-2 text-xl text-[#1877F2]" />
                    Sign in with Facebook
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    New to Hunger End? <a href="/register" className="text-[#ff7918] font-medium hover:underline">Create Account</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
