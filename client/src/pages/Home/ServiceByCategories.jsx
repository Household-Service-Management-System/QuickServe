import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Nav"

const ServicesByCategory = () => {
  const { categoryId } = useParams(); // 👈 from URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/services/category/${categoryId}`,
        );
        setServices(res.data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">Loading services...</div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="py-28 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Available Services
          </h2>

          {services.map((service) => (
  <div
    key={service.id}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
  >
    {/* ✅ IMAGE (only if present) */}
    {service.image && (
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover"
      />
    )}

    {/* CONTENT */}
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-800">
        {service.name}
      </h3>

      <p className="text-gray-600 mt-2">
        💰 ₹{service.basePrice}
      </p>

      <p className="text-gray-500 text-sm mt-1">
        ⏱ {service.duration} minutes
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  </div>
))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServicesByCategory;
