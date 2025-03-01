import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/category/getCategories', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        if (response.data.success) {
            return response.data.data; // Return only the categories array
        } else {
            throw new Error("Failed to fetch categories");
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const AddSubcategory = () => {
    const [subcategory, setSubcategory] = useState({
        category: '',
        name: '',
        description: ''
    });

    // Fetch categories
    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['CATEGORIES'],
        queryFn: fetchCategories
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubcategory({ ...subcategory, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/subcategory/createSubcategory',
                subcategory,  // Sending JSON instead of FormData
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            toast.success('Subcategory added successfully.');
        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
            toast.error('Failed to add subcategory.');
        }
    };

    return (
        <div className="p-3 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-medium flex items-center mb-4">
                <FaPlus className="mr-2" /> Add New Subcategory
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Dropdown */}
                <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={subcategory.category}
                        onChange={handleChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                        disabled={isLoading}
                    >
                        <option value="">Select Category</option>
                        {isLoading ? (
                            <option>Loading categories...</option>
                        ) : isError ? (
                            <option>Error fetching categories</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                {/* Subcategory Name */}
                <div>
                    <label className="block text-gray-700 mb-2">Subcategory Name</label>
                    <input
                        type="text"
                        name="name"
                        value={subcategory.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={subcategory.description}
                        onChange={handleChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Subcategory
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddSubcategory;
