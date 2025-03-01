import axios from "axios";
import { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import Footer from "../common/customer/Footer";
import Hero from "../common/customer/Hero";
import ItemCard from "../common/customer/ItemCard";
import Layout from "../common/customer/layout";

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [trendingItems, setTrendingItems] = useState([]);
    const [bestSellerItems, setBestSellerItems] = useState([]);
    const [specialItems, setSpecialItems] = useState([]);
    const customerId = localStorage.getItem("userId"); // Get customerId from local storage

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/item/items-by-tags");
                const data = response.data;

                setFeaturedItems(data.Featured ?? []);
                setTrendingItems(data.Trending ?? []);
                setBestSellerItems(data.Popular ?? []);
                setSpecialItems(data.Special ?? []);
            } catch (error) {
                console.error("Error fetching items by tags:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <>
            <Layout />
            <Hero />
            <div>
                <section className="bg-gray-100 p-4">
                    <h2 className="text-xl font-medium ml-16 p-2">Featured Items</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 ml-16">
                        {featuredItems.map((item) => (
                            <ItemCard key={item.id || item._id || item.name} item={item} customerId={customerId} />
                        ))}
                    </div>
                </section>

                <section className="bg-gray-100 p-4">
                    <h2 className="text-xl font-medium ml-16 p-2">Trending Items</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 ml-16">
                        {trendingItems.map((item) => (
                            <ItemCard key={item.id || item._id || item.name} item={item} customerId={customerId} />
                        ))}
                    </div>
                </section>

                <section className="bg-gray-100 p-4">
                    <h2 className="text-xl font-medium ml-16 p-2">Best Seller Items</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 ml-16">
                        {bestSellerItems.map((item) => (
                            <ItemCard key={item.id || item._id || item.name} item={item} customerId={customerId} />
                        ))}
                    </div>
                </section>

                <section className="bg-gray-100 p-4">
                    <h2 className="text-xl font-medium ml-16 p-2">Hunger End Special</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 ml-16">
                        {specialItems.map((item) => (
                            <ItemCard key={item.id || item._id || item.name} item={item} customerId={customerId} />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Home;
