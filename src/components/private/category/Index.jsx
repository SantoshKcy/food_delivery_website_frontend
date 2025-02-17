import { useState } from 'react';
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllCategory = () => {
    const [search, setSearch] = useState('');

    const categories = [
        { _id: 'CAT001', name: 'Pizza', description: 'Delicious pizzas', image: "/src/assets/images/restaurant.jpg" },
        { _id: 'CAT002', name: 'Burgers', description: 'Juicy burgers', image: 'https://via.placeholder.com/50' },
        { _id: 'CAT003', name: 'Drinks', description: 'Refreshing drinks', image: 'https://via.placeholder.com/50' },
        { _id: 'CAT004', name: 'Desserts', description: 'Sweet treats', image: 'https://via.placeholder.com/50' }
    ];

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                    <FaTags className="mr-2" /> Category List ({categories.length})
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
                    {filteredCategories.map((category, index) => (
                        <tr key={category._id} className="text-center">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b">{category._id}</td>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">{category.description}</td>
                            <td className="py-7 px-4 border-b flex justify-center space-x-2">
                                <Link to={`/edit-category/${category._id}`} className="text-blue-500 hover:text-blue-700"><FaEdit /></Link>
                                <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCategory;
