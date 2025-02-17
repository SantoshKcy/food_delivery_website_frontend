import { useState } from 'react';
import { FaEdit, FaSearch, FaTags, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllItem = () => {
    const [search, setSearch] = useState('');

    // Example item data with image, subcategory, and availability
    const items = [
        {
            _id: 'ITEM001',
            name: 'Veg Pizza',
            category: 'Pizza',
            description: 'Vegetarian pizzas',
            price: '$12.99',
            image: "/src/assets/images/restaurant.jpg", // Example image URL
            subcategory: 'Vegetarian',
            availability: 'In Stock' // New field
        },
        {
            _id: 'ITEM002',
            name: 'Cheese Burger',
            category: 'Burgers',
            description: 'Cheesy burgers',
            price: '$8.99',
            image: "/src/assets/images/restaurant.jpg", // Example image URL
            subcategory: 'Cheese',
            availability: 'Out of Stock' // New field
        },
        {
            _id: 'ITEM003',
            name: 'Soft Drinks',
            category: 'Drinks',
            description: 'Cool soft drinks',
            price: '$2.99',
            image: "/src/assets/images/restaurant.jpg", // Example image URL
            subcategory: 'Soda',
            availability: 'In Stock' // New field
        },
        {
            _id: 'ITEM004',
            name: 'Ice Cream',
            category: 'Desserts',
            description: 'Chilled desserts',
            price: '$5.99',
            image: "/src/assets/images/restaurant.jpg", // Example image URL
            subcategory: 'Frozen',
            availability: 'In Stock' // New field
        }
    ];

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center">
                    <FaTags className="mr-2" /> Item List ({items.length})
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
                        <th className="py-2 px-4 border-b">Availability</th> {/* Added column */}
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={item._id} className="text-center">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{item._id}</td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.category}</td>
                            <td className="py-2 px-4 border-b">{item.subcategory}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b">{item.description}</td>
                            <td className="py-2 px-4 border-b">{item.price}</td>
                            <td className="py-2 px-4 border-b">{item.availability}</td> {/* Displaying availability */}
                            <td className="py-7 px-4 border-b flex justify-center space-x-2">
                                <Link to={`/edit-subcategory/${item._id}`} className="text-blue-500 hover:text-blue-700"><FaEdit /></Link>
                                <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllItem;
