import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for confirmAlert
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const fetchSubcategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/subcategory/getSubcategories', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error("Failed to fetch subcategories");
        }
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
};

const AllSubcategory = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch subcategories using react-query
    const { data: subcategories, isLoading, isError } = useQuery({
        queryKey: ['SUBCATEGORIES'],
        queryFn: fetchSubcategories
    });

    // Filter subcategories based on search input
    const filteredSubcategories = subcategories
        ? subcategories.filter(subcategory => subcategory.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    // Delete category mutation
    const deleteMutation = useMutation({
        mutationFn: async (subcategoryId) => {
            await axios.delete(`http://localhost:3000/api/v1/subcategory/deleteSubcategory/${subcategoryId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
        },
        onSuccess: () => {
            toast.success('Subcategory deleted successfully.');
            queryClient.invalidateQueries(['SUBCATEGORIES']); // Refetch categories
        },
        onError: () => {
            toast.error('Failed to delete subcategory');
        },
    });

    // Handle delete with confirmation
    const handleDelete = (subcategoryId) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this subcategory?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteMutation.mutate(subcategoryId),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    return (
        <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                    <FaTags className="mr-2" /> Subcategory List
                </h2>
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search by subcategory name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg pl-10 pr-4 py-2 w-full"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                </div>
            </div>

            {isLoading && <p>Loading subcategories...</p>}
            {isError && <p className="text-red-500">Error fetching subcategories.</p>}

            {!isLoading && !isError && (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">SN</th>
                            <th className="py-2 px-4 border-b">Subcategory ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubcategories.map((subcategory, index) => (
                            <tr key={subcategory._id} className="text-center">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{subcategory._id}</td>
                                <td className="py-2 px-4 border-b">{subcategory.name}</td>
                                <td className="py-2 px-4 border-b">{subcategory.category?.name || "N/A"}</td>
                                <td className="py-2 px-4 border-b">{subcategory.description}</td>
                                <td className="py-7 px-4 border-b flex justify-center space-x-2">
                                    <button
                                        onClick={() => {
                                            console.log("Navigating to:", `/admin/category/edit-subcategory/${subcategory._id}`);
                                            window.location.href = `/admin/subcategory/edit-subcategory/${subcategory._id}`;
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(subcategory._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllSubcategory;
