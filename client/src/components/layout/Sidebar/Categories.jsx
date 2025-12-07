// Categories.jsx
import { motion } from "framer-motion";
import HomeCleaning from "../../../../src/assets/categories/cleaning.png"
import WM from "../../../../src/assets/categories/WashingMachine.png"
import AC from "../../../../src/assets/categories/ACRepair.png"

import Carpenter from "../../../../src/assets/categories/carpenter.png"
import Plumber from "../../../../src/assets/categories/plumber.png"

import PestControl from "../../../../src/assets/categories/PestControl.png"

import Refrigerator from "../../../../src/assets/categories/Refrigerator.png"

import TV from "../../../../src/assets/categories/TV.png"
const categories = [
  {
    title: "Home Cleaning",
    img: HomeCleaning,
  },
  {
    title: "Refrigerator",
    img: Refrigerator,
  },
  {
    title: "Plumber",
    img: Plumber,
  },
  {
    title: "Carpenter",
    img: Carpenter,
  },
  {
    title: "AC Repair",
    img: AC,
  },
  {
    title: "Pest Control",
    img: PestControl,
  },
  {
    title: "Washing Machine",
    img: WM,
    },
  {
    title: "Television",
    img: TV,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
          Popular Services
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
