import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
/**
 * Reusable component:
 * - Uses categoryId from URL if present
 * - Otherwise uses propCategoryId (Home page)
 */
const ServicesByCategory = ({ propCategoryId }) => {
  const params = useParams();
  const navigate = useNavigate();

  // ✅ URL param has priority, fallback to prop
  const categoryId = params.categoryId || propCategoryId;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return; // safety check

    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/services/category/${categoryId}`
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

  return (
    <section className="pt-6 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl inline-flex items-center font-bold text-blue-900 mb-4">
            Most Booked Services
          </h2>
          {/* inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-80 text-xs md:text-sm font-semibold text-blue-900 mb-4 */}
          <p className="text-gray-500 mt-1">
            Choose the service that fits your needs
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-44 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No services available in this category
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() =>
                  navigate(`/services/details/${service.id}`)
                }
                className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden flex"
              >
                {/* IMAGE */}
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  {service.serviceImage ? (
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                  
                </div>

                {/* CONTENT */}
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Trusted professionals • Quality assured
                    </p>

                    <div className="mt-4 flex items-center gap-6">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{service.basePrice}
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏱ {service.duration} mins
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
                      <span>⭐ 4.7</span>
                      <span>300+ bookings</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/services/details/${service.id}`);
                    }}
                    className="mt-5 self-start bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition active:scale-[0.97]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesByCategory;