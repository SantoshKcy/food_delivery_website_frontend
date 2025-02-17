import Footer from '../../components/Footer';
import Hero from '../../components/hero';
import Layout from '../../components/layout';
import RestaurantCard from "../../components/RestaurantCard";

function Home() {
    return (
        <>
            <Layout />
            <Hero />
            <div className="p-2 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-0.5 gap-y-10 " >
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
                <RestaurantCard
                    name="Hungry Puppets"
                    location="Durbar Marg"
                    rating={4.7}
                    reviews={3}
                    imageUrl="/src/assets/images/restaurant.jpg"
                />
            </div>
            <Footer />
        </>
    );
}

export default Home;
