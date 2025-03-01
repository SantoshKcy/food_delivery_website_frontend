import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const AddItem = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // States for form fields
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tags, setTags] = useState([]); // State for storing selected tags

    // Tags options
    const tagOptions = ["Featured", "Popular", "Trending", "Special"];

    // Fetch categories
    const { data: categories, isLoading: categoryLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/api/v1/category/getCategories', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return response.data.data;
        }
    });

    // Fetch subcategories when category changes
    const { data: subcategories, isLoading: subcategoryLoading } = useQuery({
        queryKey: ["subcategories", category],
        queryFn: async () => {
            if (!category) return [];
            const res = await axios.get(`http://localhost:3000/api/v1/subcategory/getSubcategoriesByCategoryId/${category}`);
            return res.data.data; // Ensure to return `res.data.data` if response structure contains { success, count, data }
        },
        enabled: !!category, // Only fetch when category is selected
    });

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Create image preview URL
        }
    };

    // Handle tag selection (checkbox)
    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setTags((prevTags) => (checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)));
    };

    // Mutation to submit new item
    const mutation = useMutation({
        mutationFn: async (newItem) => {
            const formData = new FormData();
            formData.append("name", newItem.name);
            formData.append("category", newItem.category);
            formData.append("subcategory", newItem.subcategory);
            formData.append("description", newItem.description);
            formData.append("price", newItem.price);
            formData.append("availability", newItem.availability);
            formData.append("tags", newItem.tags.join(",")); // Send as comma-separated string
            formData.append("itemImage", newItem.image);

            await axios.post("http://localhost:3000/api/v1/item/createItem", formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + localStorage.getItem("token") },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["items"]); // Refetch items after adding
            toast.success("Item added successfully!");
            // Reset the form fields
            setName("");
            setCategory("");
            setSubcategory("");
            setDescription("");
            setPrice("");
            setAvailability("");
            setImage(null);
            setPreview(null);
            setTags([]); // Clear tags // Show success toast
        },
        onError: (error) => {
            toast.error(`Error: ${error.response?.data?.message || "Something went wrong!"}`); // Show error toast
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !category || !subcategory || !description || !price || !image) {
            toast.error("Please fill in all fields and upload an image."); // Show error toast
            return;
        }

        const newItem = {
            name,
            category,
            subcategory,
            description,
            price,
            availability,
            tags,
            image,
        };

        mutation.mutate(newItem);
    };

    return (
        <div className="p-3 bg-white rounded-lg ">
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

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        disabled={categoryLoading}
                    >
                        <option value="">Select Category</option>
                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Subcategory</label>
                    <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        disabled={!category || subcategoryLoading}
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories?.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
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
                {/* Availability Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Availability</label>
                    <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Select Availability</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input type="file" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg" />
                    {preview && (
                        <div className="mt-2">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                {/* Tags checkboxes */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex space-x-4">
                        {tagOptions.map((tag) => (
                            <div key={tag}>
                                <input
                                    type="checkbox"
                                    value={tag}
                                    checked={tags.includes(tag)}
                                    onChange={handleTagChange}
                                    className="mr-2"
                                />
                                <span>{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">
                        {mutation.isLoading ? "Adding..." : "Add Item"}
                    </button>
                </div>
            </form>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default AddItem;
