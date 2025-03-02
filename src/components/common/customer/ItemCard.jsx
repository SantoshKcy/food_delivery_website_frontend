import axios from "axios";
import { Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const ItemCard = ({ item, customerId }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        document.body.style.overflow = modalIsOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [modalIsOpen]);

    useEffect(() => {
        if (!customerId) return;
        axios.get(`http://localhost:3000/api/v1/wishlist/check/${item._id}?customerId=${customerId}`)
            .then((res) => setIsWishlisted(res.data.isWishlisted))
            .catch((err) => console.error("Error checking wishlist:", err));
    }, [item._id, customerId]);

    const toggleWishlist = async () => {
        try {
            const customerId = localStorage.getItem("userId"); // Retrieve customer ID

            if (!customerId) {
                toast.error("Please log in to continue!", { position: "top-right" });
                return;
            }

            if (isWishlisted) {
                await axios.delete(`http://localhost:3000/api/v1/wishlist/remove/${item._id}`, {
                    params: { customerId },
                });
            } else {
                await axios.post(`http://localhost:3000/api/v1/wishlist/add`, { customerId, itemId: item._id });
            }

            setIsWishlisted((prev) => !prev);
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            toast.error("Something went wrong! Please try again.");
        }
    };


    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
    };

    const addToCart = async () => {
        try {
            const customerId = localStorage.getItem("userId"); // Retrieve customerId from local storage

            if (!customerId) {
                toast.error("Please log in to continue.", { position: "top-right", autoClose: 5000 });
                return;
            }

            const response = await axios.post(`http://localhost:3000/api/v1/cart/add`, {
                customerId,
                itemId: item._id,
                quantity,
            });

            console.log("Added to cart:", response.data);
            toast.success("Item added to cart successfully.", { autoClose: 5000 });

        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart.", { autoClose: 5000 });
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl group relative cursor-pointer">
            <div className="relative">
                <img
                    src={`http://localhost:3000/uploads/${item.image}`}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md transition duration-300 group-hover:opacity-70"
                    onClick={() => navigate(`/item/details/${item._id}`)}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-white text-black border border-gray-300 p-3 rounded-lg shadow-lg" onClick={() => setModalIsOpen(true)}>
                        <Eye size={22} />
                    </button>
                    <button
                        className={`bg-white p-3 rounded-lg shadow-lg ${isWishlisted ? "text-red-500 bg-red-500" : "text-black"}`}
                        onClick={toggleWishlist}
                    >
                        <FaHeart size={22} />
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <h3 className="text-base font-semibold" onClick={() => navigate(`/item/details/${item._id}`)}>{item.name}</h3>
                {/* <div className="bg-green-500 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
                    <span className="font-medium">5.0</span>
                    <Star size={14} />
                </div> */}
            </div>

            <span className="font-bold text-lg mt-2 text-[#ff7918] block">Rs {item.price}</span>

            <div className="flex items-center mt-4 space-x-2">
                <div className="flex items-center border border-black rounded-md">
                    <button className="bg-black text-white px-4 py-2" onClick={() => handleQuantityChange("decrease")}>-</button>
                    {/* <input
                        type="number"
                        className="w-12 h-10 text-center border-0 items-center justify-center outline-none bg-white"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    /> */}
                    <span className="w-12 h-10 flex items-center justify-center text-center bg-white">{quantity}</span>
                    <button className="bg-black text-white px-4 py-2" onClick={() => handleQuantityChange("increase")}>+</button>
                </div>

                <button className="border border-[#ff7918] text-[#ff7918] font-medium px-4 py-2 rounded-lg" onClick={addToCart}>
                    Add to cart
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Item Details"
                className="fixed bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <button onClick={() => setModalIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <div className="relative">
                    <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />

                    <button className={`absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md ${isWishlisted ? "text-red-500" : "text-black"}`} onClick={toggleWishlist}>
                        <FaHeart size={18} />
                    </button>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <span className="font-bold text-lg text-[#ff7918] block mb-4">Rs {item.price}</span>

                {/* Quantity Selector and Add to Cart button side by side */}
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center border border-black rounded-md">
                        <button className="bg-black text-white px-4 py-2" onClick={() => handleQuantityChange("decrease")}>-</button>
                        {/* <input
                            type="number"
                            className="w-12 h-10 text-center items-center justify-center border-0 outline-none bg-white"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        /> */}
                        <span className="w-12 h-10 flex items-center justify-center text-center bg-white">{quantity}</span>
                        <button className="bg-black text-white px-4 py-2" onClick={() => handleQuantityChange("increase")}>+</button>
                    </div>

                    <button className="border border-[#ff7918] text-[#ff7918] font-medium px-4 py-2 rounded-lg flex-1" onClick={addToCart}>
                        Add to cart
                    </button>
                </div>


            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ItemCard;
