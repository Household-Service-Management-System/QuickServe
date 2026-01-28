import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Nav";

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
  key={service.id}
  className="flex bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
>
  {/* Image section */}
  <div className="w-1/3 flex items-center justify-center bg-gray-100">
    {service.serviceImage ? (
      <img
        src={service.serviceImage}
        alt={service.name}
        className="w-40 h-40 object-cover rounded-lg"
      />
    ) : (
      <div className="w-40 h-40 flex items-center justify-center text-gray-400 text-sm">
        No Image
      </div>
    )}
  </div>

  {/* Content section */}
  <div className="w-2/3 p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">
        {service.name}
      </h3>

      <p className="text-gray-600 mt-2 text-sm">
        Reliable and professional household service.
      </p>

      <div className="mt-4 space-y-1">
        <p className="text-gray-700 font-medium">
          💰 ₹{service.basePrice}
        </p>
        <p className="text-gray-500 text-sm">
          ⏱ {service.duration} minutes
        </p>
      </div>
    </div>

    <button className="mt-5 self-start bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
      View Details
    </button>
  </div>
</div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServicesByCategory;
