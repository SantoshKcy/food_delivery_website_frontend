import axios from 'axios';
import { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

const Login = () => {
    const { login } = useAuth(); // Access login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: "", password: "" }); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError({ email: "", password: "" });

        let isValid = true;
        if (!email) {
            setError((prevError) => ({ ...prevError, email: "Email is required" }));
            isValid = false;
        }
        if (!password) {
            setError((prevError) => ({ ...prevError, password: "Password is required" }));
            isValid = false;
        }
        if (!isValid) return;

        try {
            // Make API call
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                const { token, userId, role } = response.data; // Ensure backend sends `role`

                // Update context with login info
                login(token, userId, role);

                toast.success('Login successful!');

                setTimeout(() => {
                    // Navigate based on role
                    if (role === "admin") {
                        window.location.href = "/admin/dashboard";// Redirect to admin panel
                    } else {
                        navigate('/'); // Redirect to normal home page
                    }
                }, 1000);
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            toast.error('Invalid email or password.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="absolute top-8 left-14 flex items-center">
                <Link to="/" className="flex items-center">
                    <img
                        src="/src/assets/images/logo.png"
                        alt="Hunger End Logo"
                        className="w-11 mr-2"
                    />
                    <span className="text-xl font-medium text-[#ff7918]">Hunger End</span>
                </Link>
            </div>
            <div className="bg-white p-7 rounded-2xl shadow-lg w-[27rem] max-w-lg">
                <h2 className="text-3xl font-medium text-start text-gray-800">Log in</h2>
                <p className="text-sm text-gray-500 text-start mb-6 mt-2">Welcome back! sign in to start your food journey.</p>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter email"
                        />
                        {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>} {/* Show email error */}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter password"
                        />
                        {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>} {/* Show password error */}
                    </div>

                    <div className="text-right mb-4">
                        <a href="#" className="text-[#ff7918] text-sm font-medium hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full bg-[#ff7918] text-white font-semibold p-3 rounded-lg hover:bg-[#e86a15] transition">
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

            {/* ToastContainer to display success or error messages */}
            <ToastContainer />
        </div>
    );
};

export default Login;
