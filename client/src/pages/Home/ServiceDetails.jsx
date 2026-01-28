import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Nav";
import Footer from "./Footer";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/services/details/${serviceId}`,
        );
        setService(res.data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20 text-red-500">Service not found</div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="py-28 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* IMAGE SECTION */}
              <div className="bg-gray-100 flex items-center justify-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full max-h-[420px] object-contain p-6"
                  />
                ) : (
                  <div className="h-[420px] flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* CONTENT SECTION */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {service.name}
                  </h1>

                  <p className="text-gray-500 mt-1">{service.categoryName}</p>

                  <div className="mt-6 flex items-center gap-6">
                    <p className="text-2xl font-semibold text-gray-800">
                      ₹{service.basePrice}
                    </p>

                    <p className="text-gray-600">⏱ {service.duration} mins</p>

                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                      {service.availability}
                    </span>
                  </div>

                  <hr className="my-6" />

                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <button className="mt-8 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
                  Book Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServiceDetails;
