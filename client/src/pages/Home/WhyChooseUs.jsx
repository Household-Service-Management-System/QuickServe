import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Professionals",
    desc: "All experts are background-checked and trained before onboarding.",
    icon: "✅",
  },
  {
    title: "Transparent Pricing",
    desc: "Clear, upfront pricing with no hidden charges or surprises.",
    icon: "💵",
  },
  {
    title: "On-Time Service",
    desc: "Professionals arrive exactly at your chosen date and time.",
    icon: "⏱️",
  },
  {
    title: "Guaranteed Satisfaction",
    desc: "If you're not fully satisfied, we make it right immediately.",
    icon: "🌟",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
          Why Choose QuickServe?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          {features.map((f, index) => (
            <motion.div
              key={index}
              className="p-8 bg-[#f2fbf8] rounded-xl shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
