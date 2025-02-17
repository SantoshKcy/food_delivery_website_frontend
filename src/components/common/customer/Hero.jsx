import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigation function
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-[#f5f5f5]">
          {/* Text Section */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Your Favourite Food Delivered Hot & Fresh
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Enjoy the best meals made with fresh ingredients, delivered straight to your door.
            </p>
            <button onClick={() => navigate("/order")} className="bg-orange-600 text-white py-3 px-8 text-xl rounded-lg hover:bg-orange-700 transition duration-300">
              View Menu
            </button>
          </div>
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img src="/src/assets/images/restaurant.jpg" alt="Healthy Food" className="w-full max-w-lg rounded-lg shadow-lg" />
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-[#f5f5f5]">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Fresh Ingredients, Healthy Choices
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Taste the freshness with every bite. Healthy meals await!
            </p>
            <button className="bg-orange-600 text-white py-3 px-8 text-xl rounded-lg hover:bg-orange-700 transition duration-300">
              Order Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/src/assets/images/restaurant.jpg" alt="Fresh Ingredients" className="w-full max-w-lg rounded-lg shadow-lg" />
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-[#f5f5f5]">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Convenient & Quick Delivery
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Enjoy quick and hassle-free delivery at your convenience.
            </p>
            <button className="bg-orange-600 text-white py-3 px-8 text-xl rounded-lg hover:bg-orange-700 transition duration-300">
              Order Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/src/assets/images/restaurant.jpg" alt="Quick Delivery" className="w-full max-w-lg rounded-lg shadow-lg" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Hero;
