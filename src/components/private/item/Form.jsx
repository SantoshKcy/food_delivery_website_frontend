import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const navigate = useNavigate();

    // States for form fields
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [image, setImage] = useState(null);

    // Example categories and subcategories
    const categories = ['Pizza', 'Burgers', 'Drinks', 'Desserts'];
    const subcategories = {
        Pizza: ['Vegetarian', 'Non-Vegetarian', 'Cheese'],
        Burgers: ['Beef', 'Chicken', 'Veg'],
        Drinks: ['Soda', 'Juice', 'Water'],
        Desserts: ['Frozen', 'Chilled', 'Cake']
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!name || !category || !subcategory || !description || !price || !image) {
            alert('Please fill in all fields and upload an image.');
            return;
        }

        // Example of how the item data might look
        const newItem = {
            _id: `ITEM${Math.floor(Math.random() * 1000)}`, // Random ID for example
            name,
            category,
            subcategory,
            description,
            price,
            availability,
            image: URL.createObjectURL(image), // Temporarily displaying image before saving to server
        };

        console.log('New Item:', newItem);

        // Simulate a successful submission (redirecting after form submit)
        navigate('/items'); // You can redirect to a list or show success message

        // Clear form fields after submission
        setName('');
        setCategory('');
        setSubcategory('');
        setDescription('');
        setPrice('');
        setAvailability('');

        setImage(null);
    };

    return (
        <div className="p-3 bg-white rounded-lg">
            <h2 className="text-xl font-medium flex items-center mb-4">
                <FaPlus className="mr-2" /> Add New Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter item name"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Subcategory</label>
                    <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        disabled={!category} // Disable subcategory dropdown until category is selected
                    >
                        <option value="">Select Subcategory</option>
                        {category &&
                            subcategories[category].map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter price"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Availability</label>
                    <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Select Availability</option> {/* Default option */}
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    {image && <p className="mt-2 text-sm text-gray-500">{image.name}</p>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg"
                    >
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
