import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleImageChange = (e) => {
        setCategory({ ...category, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call with FormData)
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        formData.append('image', category.image);

        console.log('Category added:', category);
    };

    return (
        <div className="p-3 bg-white rounded-lg">
            <h2 className="text-xl font-medium flex items-center mb-4">
                <FaPlus className="mr-2" /> Add New Category
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
