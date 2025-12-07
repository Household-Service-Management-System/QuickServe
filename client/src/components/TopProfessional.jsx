import { motion } from "framer-motion";

const pros = [
  {
    name: "Rahul Patil",
    role: "Electrician",
    experience: "5 yrs experience",
    rating: "4.9 (1.1k reviews)",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sneha Deshmukh",
    role: "Home Cleaning Expert",
    experience: "3 yrs experience",
    rating: "4.8 (900 reviews)",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Joshi",
    role: "Plumber",
    experience: "6 yrs experience",
    rating: "4.7 (780 reviews)",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Priya Kulkarni",
    role: "AC Repair Technician",
    experience: "4 yrs experience",
    rating: "4.9 (1.3k reviews)",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TopProfessionals = () => {
  return (
    <section className="py-20 bg-[#f2fbf8]" id="top-professionals">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-10">
          Top Rated Professionals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {pros.map((pro, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={pro.img}
                alt={pro.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{pro.name}</h3>
              <p className="text-green-700 font-medium">{pro.role}</p>
              <p className="text-sm text-gray-500 mt-1">{pro.experience}</p>
              <p className="text-sm text-yellow-600 mt-2">⭐ {pro.rating}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProfessionals;
