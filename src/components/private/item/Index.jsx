import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Import toast

// Fetch items function
const fetchItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/item/getItems', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error("Failed to fetch items");
        }
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

const AllItem = () => {
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();

    // Fetch items using react-query
    const { data: items, isLoading, isError } = useQuery({
        queryKey: ['ITEMS'],
        queryFn: fetchItems,
    });

    // Filter items based on search input
    const filteredItems = items
        ? items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    // Delete item mutation
    const deleteMutation = useMutation({
        mutationFn: async (itemId) => {
            await axios.delete(`http://localhost:3000/api/v1/item/deleteItem/${itemId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
        },
        onSuccess: () => {
            toast.success('Item deleted successfully.');
            queryClient.invalidateQueries(['ITEMS']); // Refetch items
        },
        onError: () => {
            toast.error('Failed to delete item');
        },
    });

    // Handle delete with confirmation
    const handleDelete = (itemId) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteMutation.mutate(itemId),
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
                    <FaTags className="mr-2" /> Item List
                </h2>
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search by item name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg pl-10 pr-4 py-2 w-full"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                </div>
            </div>

            {isLoading && <p>Loading items...</p>}
            {isError && <p className="text-red-500">Error fetching items.</p>}

            {!isLoading && !isError && (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">SN</th>
                            <th className="py-2 px-4 border-b">Item ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Subcategory</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Tags</th> {/* Displaying tags */}
                            <th className="py-2 px-4 border-b">Availability</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{item._id}</td>
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b">{item.category.name}</td>
                                <td className="py-2 px-4 border-b">{item.subcategory.name}</td>
                                <td className="py-2 px-4 border-b">
                                    <img
                                        src={`http://localhost:3000/uploads/${item.image}`}  // Full image URL
                                        alt={item.name}
                                        className="w-20 h-15 object-cover rounded mx-auto"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{item.description}</td>
                                <td className="py-2 px-4 border-b">{item.price}</td>
                                <td className="py-2 px-4 border-b">
                                    {item.tags ? item.tags.join(', ') : 'N/A'} {/* Displaying tags */}
                                </td>
                                <td className="py-2 px-4 border-b">{item.availability}</td>
                                <td className="py-10 px-4 border-b flex justify-center space-x-2">
                                    <button
                                        onClick={() => {

                                            window.location.href = `/admin/menu/edit-item/${item._id}`;
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(item._id)}
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

export default AllItem;
