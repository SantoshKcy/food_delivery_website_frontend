import { useState } from 'react';
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllSubcategory = () => {
    const [search, setSearch] = useState('');

    const subcategories = [
        { _id: 'SUB001', name: 'Veg Pizza', category: 'Pizza', description: 'Vegetarian pizzas' },
        { _id: 'SUB002', name: 'Cheese Burger', category: 'Burgers', description: 'Cheesy burgers' },
        { _id: 'SUB003', name: 'Soft Drinks', category: 'Drinks', description: 'Cool soft drinks' },
        { _id: 'SUB004', name: 'Ice Cream', category: 'Desserts', description: 'Chilled desserts' }
    ];

    const filteredSubcategories = subcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                    <FaTags className="mr-2" /> Subcategory List ({subcategories.length})
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
                            <td className="py-2 px-4 border-b">{subcategory.category}</td>
                            <td className="py-2 px-4 border-b">{subcategory.description}</td>
                            <td className="py-7 px-4 border-b flex justify-center space-x-2">
                                <Link to={`/edit-subcategory/${subcategory._id}`} className="text-blue-500 hover:text-blue-700"><FaEdit /></Link>
                                <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSubcategory;
