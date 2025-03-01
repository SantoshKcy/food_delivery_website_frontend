import { PackageCheck, PackageX, ShoppingBag, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from '../common/customer/Footer';
import Layout from '../common/customer/layout';

const MyOrders = () => {
    const [orders, setOrders] = useState([]); // To store the fetched orders
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(""); // To handle any errors
    const userId = localStorage.getItem("userId");

    // Function to get status icon and color
    const getStatusInfo = (status) => {
        switch (status) {
            case "Processing":
                return { icon: <Truck size={18} className="text-yellow-500" />, color: "text-yellow-500" };
            case "Delivered":
                return { icon: <PackageCheck size={18} className="text-green-500" />, color: "text-green-500" };
            case "Cancelled":
                return { icon: <PackageX size={18} className="text-red-500" />, color: "text-red-500" };
            default:
                return { icon: <Truck size={18} />, color: "" };
        }
    };

    // Fetch orders from the API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`http://localhost:3000/api/v1/order/orders/user/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError("Error fetching orders: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <>
            <Layout />
            <div className="flex min-h-screen p-10 gap-6">
                {/* Sidebar */}
                <div className="w-1/4 flex flex-col space-y-4 mt-14 border-r border-gray-300 p-4">
                    <Link to="/profile">
                        <button className="flex items-center gap-2 p-2 border rounded-md w-full bg-white">
                            <User size={18} /> My Profile
                        </button>
                    </Link>

                    <button className="flex items-center gap-2 p-2 border rounded-md w-full bg-orange-500 text-white">
                        <ShoppingBag size={18} /> My Orders
                    </button>
                </div>

                {/* Main Content */}
                <div className="w-2/4 space-y-6">
                    <h2 className="text-xl font-semibold">My Orders</h2>

                    {/* Loading, Error, and Orders List */}
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {/* Orders List */}
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="border rounded-lg p-6 space-y-3 bg-white shadow-md">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                                    <div className={`flex items-center gap-2 ${getStatusInfo(order.orderStatus).color}`}>
                                        {getStatusInfo(order.orderStatus).icon}
                                        {order.orderStatus}
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-4 py-2 border text-left">Item Name</th>
                                                <th className="px-4 py-2 border text-left">Description</th>
                                                <th className="px-4 py-2 border text-left">Quantity</th>
                                                <th className="px-4 py-2 border text-left">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.cartItems.map((item, index) => (
                                                <tr key={item._id} className="border-b">
                                                    <td className="px-4 py-2">{item.itemId.name}</td>
                                                    <td className="px-4 py-2">{item.itemId.description}</td>
                                                    <td className="px-4 py-2">{item.quantity}</td>
                                                    <td className="px-4 py-2">Rs {item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <p className="text-lg font-semibold">Subtotal: Rs {order.subtotal}</p>
                                    <p className="text-lg font-semibold">Total Price: Rs {order.totalPrice}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center">No orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
