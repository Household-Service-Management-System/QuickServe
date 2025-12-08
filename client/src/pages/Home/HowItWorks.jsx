import { motion } from "framer-motion";
import Navbar from "./Nav"
import Footer from "./Footer";

const steps = [
  {
    title: "1. Choose a Service",
    desc: "Select from cleaning, repairs, electrician, plumbing, beauty and more — all in one place.",
    icon: "🛠️",
  },
  {
    title: "2. Pick Date & Time",
    desc: "Choose a convenient time slot that fits your schedule. Our professionals arrive on time.",
    icon: "⏰",
  },
  {
    title: "3. Get the Service Done",
    desc: "A trained & verified expert completes the job. Sit back and relax — we handle everything.",
    icon: "🏠",
  },
];

const HowItWorks = () => {
    return (
      
        <section className="py-20 bg-white" id="how-it-works">
            <Navbar/>
      <div className="mt-24 mb-36 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-8 bg-[#f2fbf8] rounded-xl shadow-md hover:shadow-xl transition cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
            </div>
            <Footer/>
    </section>
  );
};

export default HowItWorks;
