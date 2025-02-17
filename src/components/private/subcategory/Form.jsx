import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddSubcategory = () => {
    const [subcategory, setSubcategory] = useState({
        category: '',
        name: '',
        description: '',
        image: null
    });

    const categories = ['Pizza', 'Burgers', 'Drinks', 'Desserts']; // Example categories

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubcategory({ ...subcategory, [name]: value });
    };

    const handleImageChange = (e) => {
        setSubcategory({ ...subcategory, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', subcategory.category);
        formData.append('name', subcategory.name);
        formData.append('description', subcategory.description);
        formData.append('image', subcategory.image);

        console.log('Subcategory added:', subcategory);
    };

    return (
        <div className="p-3 bg-white rounded-lg">
            <h2 className="text-xl font-medium flex items-center mb-4">
                <FaPlus className="mr-2" /> Add New Subcategory
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={subcategory.category}
                        onChange={handleChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
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
                <div>
                    <label className="block text-gray-700 mb-2">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="border border-gray-400 rounded-lg p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Subcategory</button>
            </form>
        </div>
    );
};

export default AddSubcategory;
