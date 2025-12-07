// PopularServices.jsx
import { motion } from "framer-motion";

import HC from "../../src/assets/categories/cleaning.png"
import AC from "../../src/assets/categories/ACRepair.png"
import PC from "../../src/assets/categories/PestControl.png"
import WM from "../../src/assets/categories/WashingMachine.png"

const services = [
  {
    title: "2BHK Home Deep Cleaning",
    price: "₹2499",
    duration: "4–5 hrs",
    rating: "4.8 (520 reviews)",
    img: HC,
  },
  {
    title: "AC Servicing (Split/Window)",
    price: "₹499",
    duration: "45 mins",
    rating: "4.9 (1.2k reviews)",
    img: AC,
  },
  {
    title: "Pest Control",
    price: "₹1299",
    duration: "2-2 hrs",
    rating: "4.7 (800 reviews)",
    img: PC,
  },
  {
    title: "Washing Machine",
    price: "₹399",
    duration: "1 hr",
    rating: "4.8 (340 reviews)",
    img: WM,
  },
];

const PopularServices = () => {
  return (
    <section className="py-20 bg-[#f2fbf8]" id="popular-services">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
          Most Booked Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl cursor-pointer transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
        
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.duration}</p>

                <p className="text-green-700 text-xl font-bold mt-3">{service.price}</p>

                <p className="text-sm text-yellow-600 mt-1">⭐ {service.rating}</p>
                
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularServices;
