// Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { TypeAnimation } from "react-type-animation";
import Nav from "./Nav";
import Footer from "./Footer";
import Categories from "../../components/layout/Sidebar/Categories";

const bannerImages = [
  "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // cleaning
  "https://images.pexels.com/photos/5591843/pexels-photo-5591843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // handyman
  "https://images.pexels.com/photos/5691503/pexels-photo-5691503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // electrician
  "https://images.pexels.com/photos/4491919/pexels-photo-4491919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // plumber
];

const Home = () => {
  return (
    <div className="bg-[#f2fbf8] text-gray-900 min-h-screen" id="top">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] md:h-screen flex justify-center items-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {bannerImages.map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />

              
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-4">
                <div className="max-w-5xl mx-auto text-center md:text-left">
                  {/* Small badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-80 text-xs md:text-sm font-semibold text-green-900 mb-4"
                  >
                    Trusted Home Services • On-Demand
                  </motion.div>

                  {/* Main Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
                  >
                    Book Trusted{" "}
                    <span className="text-green-300">Home Services</span>{" "}
                    in Minutes
                  </motion.h1>

                  {/* Animated sub-heading */}
                  <TypeAnimation
                    sequence={[
                      "Cleaning • Electrician • Plumber • AC Repair",
                      1500,
                      "Salon at Home • Painting • Pest Control",
                      1500,
                      "Verified Professionals • Standard Pricing",
                      1500,
                    ]}
                    wrapper="h2"
                    className="text-lg md:text-2xl text-green-100 mb-6 font-medium"
                    repeat={Infinity}
                  />

                  
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-2xl text-sm md:text-lg text-gray-100 mb-6"
                  >
                    QuickServe connects you with background-verified professionals
                    for all your household needs. Choose a service, pick a time,
                    and relax—we’ll handle the rest.
                  </motion.p>

                  {/* Location + Search + CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-3 md:p-4 flex flex-col md:flex-row gap-3 md:items-center mb-5"
                  >
                    {/* Location */}
                    <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white">
                      <span className="text-gray-500 text-sm">📍</span>
                      <select className="flex-1 bg-transparent text-sm md:text-base outline-none">
                        <option>Pune, Maharashtra</option>
                        <option>Mumbai, Maharashtra</option>
                        <option>Nashik, Maharashtra</option>
                        <option>Bengaluru, Karnataka</option>
                      </select>
                    </div>

                    {/* Search */}
                    <div className="flex-[2] flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white">
                      <span className="text-gray-500 text-sm">🔍</span>
                      <input
                        type="text"
                        placeholder="What service do you need? e.g. '2BHK Cleaning, AC Service'"
                        className="flex-1 bg-transparent text-xs md:text-sm outline-none"
                      />
                    </div>

                    {/* Button */}
                    <button className="w-full md:w-auto px-5 py-2.5 rounded-xl text-sm md:text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition">
                      Search Services
                    </button>
                  </motion.div>

                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-col md:flex-row gap-3 md:items-center"
                  >
                    <div className="flex gap-3">
                      <Link
                        to="/auth/signup"
                        className="px-5 py-2.5 rounded-full text-sm md:text-base font-semibold bg-white text-green-800 shadow-md hover:bg-gray-100 transition"
                      >
                        Book a Service
                      </Link>
                      
                    </div>

                    <p className="text-xs md:text-sm text-gray-200 mt-1 md:mt-0">
                      ⭐ 4.8/5 rated by 10,000+ customers • 100% verified professionals
                    </p>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Section  */}
      <Categories />

      <Footer />
    </div>
  );
};

export default Home;
