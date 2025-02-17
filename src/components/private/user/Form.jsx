import { useRef, useState } from 'react';
import { FaCog, FaEdit } from 'react-icons/fa';

const Settings = () => {
    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        phone: '+1 234 567 890',
        email: 'john@example.com',
        newPassword: '',
        confirmPassword: '',
    });
    const [profilePic, setProfilePic] = useState('/src/assets/images/restaurant.jpg'); // Placeholder image
    const fileInputRef = useRef(null); // Ref to trigger file input programmatically

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0]; // Get the first selected file

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); // Update profile pic with the selected file
            };
            reader.readAsDataURL(file); // Convert the file to a Data URL (base64)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSaveChanges = () => {
        // Logic for saving changes (e.g., API call to update user data)
        alert('Changes Saved!');
    };

    const handleChangePassword = () => {
        // Logic for changing password (e.g., API call to change password)
        if (userData.newPassword === userData.confirmPassword) {
            alert('Password Changed!');
        } else {
            alert('Passwords do not match!');
        }
    };

    return (
        <div className="max-w-7xl p-3">
            <h2 className="text-xl font-medium text-left text-black mb-8 flex items-center space-x-2">
                <FaCog className="text-gray-500" />
                <span>Setting</span>
            </h2>

            {/* Profile Picture Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6">
                <h3 className="text-lg font-medium text-left text-black mb-4">Profile Picture</h3>
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
                            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button
                            onClick={() => fileInputRef.current.click()} // Trigger file picker on edit icon click
                            className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            <FaEdit />
                        </button>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    ref={fileInputRef} // Associate the file input with the ref
                    style={{ display: 'none' }} // Hide the file input element
                />
            </div>

            {/* Basic Information Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-medium text-left text-black mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="flex flex-col sm:col-span-2">
                        <label className="text-sm text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Email Address"
                        />
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={handleSaveChanges}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
                <h3 className="text-lg font-medium text-left text-black mb-4">Change Password</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="New Password"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={handleChangePassword}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
