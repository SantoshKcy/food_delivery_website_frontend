import { ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../common/customer/Footer';
import Layout from '../common/customer/layout';

const Profile = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        phone: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePic, setProfilePic] = useState('/src/assets/images/profile.png');
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/api/v1/auth/getCustomer/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData({
                    fullName: `${data.data.fname} ${data.data.lname}` || '',
                    phone: data.data.phone || '',
                    email: data.data.email || '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setProfilePic(data.data.image || '/src/assets/images/profile.png');
                setIsLoading(false);
            } else {
                console.error('Failed to fetch user data');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }
    };

    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                const userId = localStorage.getItem('userId');
                const response = await fetch(`http://localhost:3000/api/v1/auth/updateCustomer/${userId}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfilePic(data.profilePicUrl || '/src/assets/images/profile.png');
                } else {
                    console.error('Failed to upload profile picture');
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        }
    };

    const handleProfileUpdate = async () => {
        setIsLoading(true);
        const userId = localStorage.getItem('userId');
        const updatedData = {
            fname: userData.fullName.split(' ')[0], // Extract first name
            lname: userData.fullName.split(' ')[1], // Extract last name
            phone: userData.phone,
            email: userData.email,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/v1/auth/updateCustomer/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Password updated successfully!');
                console.log('Profile updated successfully', data);
                setIsLoading(false);
            } else {
                console.error('Failed to update profile');
                toast.error('Error updating profile!');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        // Validate new password length
        if (userData.newPassword.length < 6) {
            setErrorMessage('New password must be at least 6 characters.');
            return;
        }
        // Ensure passwords match
        if (userData.newPassword !== userData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }


        setErrorMessage(''); // Clear error message
        setIsLoading(true);

        const userId = localStorage.getItem('userId');
        const passwordData = {
            oldPassword: userData.oldPassword,  // Add old password
            newPassword: userData.newPassword
        };

        try {
            const response = await fetch(`http://localhost:3000/api/v1/auth/updatePassword/${userId}`, {
                method: 'PUT',  // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(passwordData)  // Send both old and new password
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Password updated successfully!');


                setIsLoading(false);
            } else {
                console.error('Failed to update password');
                toast.error('Error updating password.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched or updated
    }


    return (
        <>
            <Layout />
            <div className="flex min-h-screen p-10 gap-6">
                {/* Sidebar */}
                <div className="w-1/4 flex flex-col space-y-4 mt-14 border-r border-gray-300 p-4">
                    <button className="flex items-center gap-2 p-2 border bg-orange-500 text-white rounded-md w-full ">
                        <User size={18} /> My Profile
                    </button>
                    <Link to="/my-orders">
                        <button className="flex items-center gap-2 p-2 border rounded-md w-full bg-white">
                            <ShoppingBag size={18} /> My Orders
                        </button>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="w-2/4 space-y-6">
                    <h2 className="text-xl font-semibold">Account Settings</h2>

                    {/* Personal Details */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-semibold">Personal Details</h3>

                        {/* Profile Picture with Edit Icon */}
                        <div className="relative w-20 h-20 rounded-full bg-gray-200">
                            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            {/* Hidden File Input */}

                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                            >
                                <FaEdit />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <form>

                            <div className="space-y-3">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={userData.fullName}
                                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleProfileUpdate}>Update Profile</button>
                            </div>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        <form>
                            <div className="space-y-3">
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    value={userData.oldPassword}
                                    onChange={(e) => setUserData({ ...userData, oldPassword: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={userData.newPassword}
                                    onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded-md" type="button"
                                    onClick={handlePasswordChange}>Chnage Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
