import { useEffect, useState } from "react";
import {
  getCustomerBookings,
  getCustomerPayments,
} from "../../api/customerService";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

/* ================= HELPERS ================= */

// Latest payment per booking (prefer SUCCESS)
const latestPaymentsByBooking = (payments) => {
  const map = new Map();

  payments.forEach((p) => {
    const id = p.bookingId;
    if (!id) return;

    const existing = map.get(id);
    if (!existing || existing.status !== "SUCCESS") {
      map.set(id, p);
    }
  });

  return map;
};

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [bRes, pRes] = await Promise.all([
        getCustomerBookings(),
        getCustomerPayments(),
      ]);

      setBookings(bRes.data || []);
      setPayments(pRes.data || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paymentMap = latestPaymentsByBooking(payments);

  const isPaid = (bookingId) =>
    paymentMap.get(bookingId)?.status === "SUCCESS";

  /* ================= STATS ================= */

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  const totalSpent = Array.from(paymentMap.values())
    .filter((p) => p.status === "SUCCESS")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Customer Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Total Bookings" value={totalBookings} />
        <Stat title="Completed" value={completedBookings} />
        <Stat title="Total Spent" value={`₹${totalSpent}`} />
        <Stat title="Payments Done" value={paymentMap.size} />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* ===== LEFT: RECENT BOOKINGS ===== */}
        <div className="md:col-span-2 bg-white border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Service</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.bookingId} className="border-t">
                    <td className="p-2">
                      {b.service || b.serviceName}
                    </td>
                    <td className="p-2">₹{b.price}</td>
                    <td className="p-2">
                      {isPaid(b.bookingId) ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4" />
                          Paid
                        </span>
                      ) : (
                        <span className="text-red-500">Unpaid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ===== RIGHT: BOOK NEW SERVICE ===== */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">
            Book New Service
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Choose a category to continue
          </p>

          <div className="space-y-3">
            {[
              "Home Cleaning",
              "Electrician",
              "Plumber",
              "AC Repair",
              "Appliance Service",
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() =>
                  navigate("/services", {
                    state: { category: cat },
                  })
                }
                className="w-full text-left border rounded-lg px-4 py-2 hover:bg-blue-50 hover:border-blue-400"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FUTURE FRIEND-INTEGRATION NOTE */}
          <p className="mt-4 text-xs text-gray-400">
            *Booking flow handled by service module
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
}
