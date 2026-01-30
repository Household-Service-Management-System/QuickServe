import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Nav";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../src/api/axiosInstance";

const ServiceDetails = () => {
  // const userId = 1; // TODO: replace with logged-in user id from auth

  const { serviceId } = useParams();

  const providersRef = useRef(null);
  const slotsRef = useRef(null);
  const dateRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [providers, setProviders] = useState([]);
  const [showProviders, setShowProviders] = useState(false);
  const [providerLoading, setProviderLoading] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  /* ================= BOOKING ================= */
  const bookService = async () => {
    if (!selectedSlot || !selectedDate || !selectedProvider) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    const payload = {
      serviceId: Number(serviceId),
      providerId: selectedProvider,
      date: selectedDate,
      startTime: selectedSlot.start,
    };

    try {
      const res = await axiosInstance.post("/bookings", payload);

      alert("✅ Service booked successfully!");

      setSelectedSlot(null);
      setSelectedDate("");
      setSlots([]);

      navigate("/customer/bookings", { replace: true });
    } catch (err) {
      console.error("Booking failed", err);
      alert(err.response?.data?.message || "❌ Booking failed");
    }
  };

  /* ================= SERVICE ================= */
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/services/details/${serviceId}`,
        );
        setService(res.data);
      } catch (err) {
        console.error("Failed to fetch service details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  /* ================= PROVIDERS ================= */
  const fetchProviders = async () => {
    try {
      setProviderLoading(true);
      const res = await axios.get(
        `http://localhost:8080/services/${serviceId}/providers`,
      );
      setProviders(res.data);
      setShowProviders(true);

      setTimeout(() => {
        providersRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error("Failed to fetch providers", err);
    } finally {
      setProviderLoading(false);
    }
  };

  /* ================= SLOTS ================= */
  const fetchSlots = async (providerId, date) => {
    if (!date) return;

    try {
      setSlotLoading(true);
      setSelectedProvider(providerId);
      setSelectedSlot(null);

      const res = await axios.get(
        `http://localhost:8080/providers/${providerId}/slots`,
        {
          params: {
            date: date, // ✅ REQUIRED BY BACKEND
          },
        },
      );

      const availableSlots = res.data.filter(
        (slot) =>
          slot.available === true ||
          slot.available === "true" ||
          slot.available === 1,
      );

      setSlots(availableSlots);

      setTimeout(() => {
        slotsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    } finally {
      setSlotLoading(false);
    }
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="py-40 text-center text-gray-500">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-40 text-center text-red-500">Service not found</div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ================= SERVICE DETAILS ================= */}
      <section className="pt-28 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-100 flex items-center justify-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full max-h-[450px] object-contain p-6"
                  />
                ) : (
                  <div className="h-[450px] flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col gap-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {service.name}
                  </h1>
                  <p className="text-gray-500 mt-1">{service.categoryName}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      ⭐ 4.8
                    </span>
                    <span className="text-sm text-gray-500">500+ bookings</span>
                  </div>

                  <p className="text-gray-700 mt-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border rounded-2xl p-6 bg-gray-50 shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{service.basePrice}
                    </p>
                    <p className="text-sm text-gray-500">
                      ⏱ {service.duration} mins
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");

                      if (!token) {
                        // Redirect to login with return path
                        navigate("/login", {
                          state: {
                            from: location.pathname,
                          },
                        });
                        return;
                      }
                      fetchProviders();
                    }}
                    disabled={providerLoading}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    {providerLoading ? "Finding Experts..." : "Book Service"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROVIDERS ================= */}
      {showProviders && (
        <section ref={providersRef} className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10">
              Choose Your Service Expert
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <div
                  key={provider.providerId}
                  className={`bg-white rounded-2xl p-6 shadow flex items-center gap-5 transition
                    ${
                      selectedProvider === provider.providerId
                        ? "ring-2 ring-green-500"
                        : "hover:shadow-xl"
                    }`}
                >
                  <img
                    src={provider.profileImage}
                    alt={provider.fullName}
                    className="w-24 h-24 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {provider.fullName}
                      {provider.verified && (
                        <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                          ✔ Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{provider.city}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProvider(provider.providerId);
                      setSlots([]);
                      setSelectedDate("");

                      setTimeout(() => {
                        dateRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }}
                    className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {selectedProvider && (
        <section ref={dateRef} className="bg-white py-10 border-t">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Select Date
            </h3>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => {
                const date = e.target.value;
                setSelectedDate(date);
                fetchSlots(selectedProvider, date);
              }}
              className="border px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>
      )}
      {/* ================= SLOTS ================= */}
      {selectedProvider && (
        <section ref={slotsRef} className="bg-white py-16 border-t">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-6">
              Select Available Time Slot
            </h3>

            {slotLoading ? (
              <p className="text-gray-500">Loading time slots...</p>
            ) : slots.length === 0 ? (
              <p className="text-gray-500">
                No available slots for this provider
              </p>
            ) : (
              <>
                {/* ✅ SLOT BUTTONS */}
                <div className="flex flex-wrap gap-4">
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-6 py-3 rounded-xl border text-sm font-semibold transition
                  ${
                    selectedSlot?.start === slot.start &&
                    selectedSlot?.end === slot.end
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-700 hover:bg-blue-50"
                  }`}
                    >
                      {slot.start} - {slot.end}
                    </button>
                  ))}
                </div>

                {/* ✅ FINAL BOOK BUTTON (ADD HERE) */}
                {selectedSlot && (
                  <div className="mt-8">
                    <button
                      onClick={bookService}
                      className="w-full md:w-auto bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Confirm & Book Service
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default ServiceDetails;
