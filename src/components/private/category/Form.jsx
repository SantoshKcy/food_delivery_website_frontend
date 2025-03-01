import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategory({ ...category, image: file });
            setImagePreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    // React Query mutation for adding category
    const addCategoryMutation = useMutation({
        mutationKey: ['ADD_CATEGORY'],
        mutationFn: async (formData) => {
            return axios.post('http://localhost:3000/api/v1/category/createCategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
        },
        onSuccess: () => {
            toast.success('Category added successfully.', { autoClose: 4000 });
            setCategory({ name: '', description: '', image: null });

            setImagePreview(null); // Reset preview
            document.getElementById("imageInput").value = ""; // Reset file input field
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to add category. Please try again.');
        }
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        if (category.image) {
            formData.append('categoryImage', category.image);
        }
        addCategoryMutation.mutate(formData);
    };

    return (
        <div className="p-3 bg-white rounded-lg shadow-lg z-[1000]">
            <h2 className="text-xl font-medium flex items-center mb-4">
                <FaPlus className="mr-2" /> Add New Category
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Name */}
                <div>
                    <label className="block text-gray-700 mb-2">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
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
                        value={category.description}
                        onChange={handleChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 mb-2">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-400 rounded-lg p-2 w-full"
                        id="imageInput" // Add id here
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-gray-600">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Selected"
                                className="mt-2 w-40 h-40 object-cover rounded-lg border"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={addCategoryMutation.isLoading}
                >
                    {addCategoryMutation.isLoading ? 'Adding...' : 'Add Category'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCategory;
