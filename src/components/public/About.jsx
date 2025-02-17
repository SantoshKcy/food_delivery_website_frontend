import { FaEnvelope, FaMobileAlt, FaMoneyBillWave, FaPhone, FaShieldAlt, FaShippingFast, FaUsers, FaUtensils } from "react-icons/fa";
import Footer from '../../components/Footer';
import Layout from '../../components/layout';

const About = () => {
    return (
        <>
            <Layout />
            <div className="max-w-5xl mx-auto p-6 bg-white mt-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
                    <FaUtensils className="text-red-500" /> About Hunger End
                </h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    Delivering Happiness, One Meal at a Time 🍔
                </p>

                <div className="space-y-6 text-gray-700">
                    {/* Our Story */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Our Story</h2>
                        <p>
                            Hunger End was founded with a simple mission: to bring delicious,
                            high-quality food to your doorstep in the fastest and most convenient way.
                            From a small food delivery service, we have grown into a platform that connects
                            food lovers with the restaurant.
                        </p>
                    </section>

                    {/* Our Mission */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                        <p>
                            We believe that everyone deserves access to fresh and tasty meals without
                            the hassle of cooking or leaving their home. Our mission is to make food
                            ordering seamless, reliable, and enjoyable.
                        </p>
                    </section>

                    {/* Why Choose Hunger End */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <FaUsers className="text-green-500" /> Why Choose Hunger End?
                        </h2>
                        <ul className="list-none space-y-2">
                            <li className="flex items-center gap-2">
                                <FaShippingFast className="text-blue-500" /> <strong>Fast & Reliable Delivery</strong> – Get your food delivered in record time.
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-yellow-500" /> <strong>Affordable Pricing</strong> – Best deals, discounts, and wallet-friendly meals.
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMobileAlt className="text-purple-500" /> <strong>Easy Ordering</strong> – User-friendly app and website for a hassle-free experience.
                            </li>
                            <li className="flex items-center gap-2">
                                <FaShieldAlt className="text-gray-500" /> <strong>Secure Payments</strong> – Multiple payment options with top-notch security.
                            </li>
                        </ul>
                    </section>

                    {/* Our Team */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Our Team</h2>
                        <p>
                            We are a passionate team of food enthusiasts, tech experts, and delivery professionals
                            dedicated to making your dining experience effortless and enjoyable. From ensuring on-time deliveries, we put customer satisfaction first.
                        </p>
                    </section>

                    {/* Join Our Community */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
                        <p>
                            Whether you're a foodie looking for a quick bite or a restaurant owner wanting to expand
                            your reach, **Hunger End** welcomes you to be a part of our growing family.
                            Let's redefine food delivery together!
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section>
                        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <FaEnvelope className="text-blue-500" /> Contact Us
                        </h2>
                        <p>Have questions or suggestions? We’d love to hear from you!</p>
                        <p className="mt-2 flex items-center gap-2">
                            <FaEnvelope className="text-red-500" /> <strong>Email:</strong> support@hungerend.com
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-green-500" /> <strong>Phone:</strong> +1 234 567 890
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
