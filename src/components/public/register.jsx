import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({}); // State to store validation errors
    const [isChecked, setIsChecked] = useState(false); // State for checkbox

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setIsChecked(checked);
            setErrors((prevErrors) => ({
                ...prevErrors,
                terms: "", // Remove error when checkbox is checked
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            // Remove error when user starts typing
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    // Validate form fields
    const validateForm = () => {
        let newErrors = {};

        if (!formData.fname.trim()) newErrors.fname = "First name is required.";
        if (!formData.lname.trim()) newErrors.lname = "Last name is required.";
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // Validate checkbox
        if (!isChecked) {
            newErrors.terms = "You must agree to the Terms and Conditions.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {

            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/register",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Registration successful!");
            console.log("Registration successful", response.data);

            setTimeout(() => {
                // Redirect to login page after success message
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            console.error("Error during registration:", error);

            // Show error message from API response (if available)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registration failed! Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-[120vh] bg-gray-100">
            <div className="absolute top-8 left-14 flex items-center">
                <Link to="/" className="flex items-center">
                    <img src="/src/assets/images/logo.png" alt="Hunger End Logo" className="w-11 mr-2" />
                    <span className="text-xl font-medium text-[#ff7918]">Hunger End</span>
                </Link>
            </div>
            <div className="bg-white p-7 rounded-2xl shadow-lg w-[30rem] max-w-lg">
                <h2 className="text-3xl font-medium text-start text-gray-800">Sign Up</h2>
                <p className="text-sm text-gray-500 text-start mb-6 mt-2">Create an account to start your food journey.</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">First Name</label>
                            <input
                                type="text"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                                placeholder="Enter first name"
                            />
                            {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Last Name</label>
                            <input
                                type="text"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                                placeholder="Enter last name"
                            />
                            {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7918]"
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isChecked}
                            onChange={handleChange}
                            className="mr-2"
                        />

                        <label htmlFor="terms" className="text-sm text-gray-500">
                            I agree to the{" "}
                            <a href="#" className="text-[#ff7918] hover:underline">
                                Terms and Conditions.
                            </a>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-sm mb-5">{errors.terms}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#ff7918] text-white font-semibold p-3 rounded-lg hover:bg-[#e86a15] transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#ff7918] font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
