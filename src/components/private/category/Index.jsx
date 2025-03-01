import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default styles
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategory = () => {
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch categories from the API
    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/api/v1/category/getCategories', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return response.data;
        }
    });

    // Delete category mutation
    const deleteMutation = useMutation({
        mutationFn: async (categoryId) => {
            await axios.delete(`http://localhost:3000/api/v1/category/deleteCategory/${categoryId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
        },
        onSuccess: () => {
            toast.success('Category deleted successfully.');
            queryClient.invalidateQueries(['categories']); // Refetch categories
        },
        onError: () => {
            toast.error('Failed to delete category');
        },
    });

    // Handle delete with confirmation
    const handleDelete = (categoryId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteMutation.mutate(categoryId),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    // Filter categories based on the search input
    const filteredCategories = data?.data.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching categories</div>;

    return (
        <div className="p-3 bg-white rounded-lg">
            <ToastContainer />
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                    <FaTags className="mr-2" /> Category List
                </h2>
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search by category name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg pl-10 pr-4 py-2 w-full"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">SN</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Category ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories?.map((category, index) => (
                        <tr key={category._id} className="text-center">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">
                                <img
                                    src={`http://localhost:3000/uploads/${category.image}`}  // Full image URL
                                    alt={category.name}
                                    className="w-20 h-15 object-cover rounded mx-auto"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">{category._id}</td>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">{category.description}</td>
                            <td className="py-10 px-4 border-b flex justify-center space-x-2">
                                <button
                                    onClick={() => {
                                        console.log("Navigating to:", `/admin/category/edit-category/${category._id}`);
                                        navigate(`/admin/category/edit-category/${category._id}`);
                                    }}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(category._id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCategory;
