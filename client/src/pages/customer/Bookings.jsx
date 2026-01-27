import { useEffect, useState } from "react";
import axios from "axios";

const USER_ID = 4;

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paymentPopup, setPaymentPopup] = useState(null);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/customer/bookings/${USER_ID}`
      );
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= STATUS CHANGE ================= */
  const updateStatus = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/customer/booking/${bookingId}/${status}`
      );
      fetchBookings();
    } catch (err) {
      alert("Failed to update booking status");
    }
  };

  /* ================= PAYMENT ================= */
  const openPayment = async (booking) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/customer/paymentByBooking/${booking.bookingId}`
      );
      setPaymentPopup({ ...res.data, booking });
    } catch {
      setPaymentPopup({ booking });
    }
  };

  const payNow = async () => {
    alert("Razorpay integration goes here");

    // after payment success:
    await axios.post("http://localhost:8080/customer/paymentAddByBooking", {
      bookingId: paymentPopup.booking.bookingId,
      amount: paymentPopup.booking.price,
      method: "UPI",
      status: "SUCCESS",
      transactionId: "TXN-" + Date.now(),
    });

    setPaymentPopup(null);
    fetchBookings();
  };

  /* ================= UI HELPERS ================= */
  const statusBadge = (status) => {
    const map = {
      PENDING: "bg-yellow-100 text-yellow-700",
      ACCEPTED: "bg-blue-100 text-blue-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-gray-200 text-gray-700",
      REJECTED: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100";
  };

  /* ================= RENDER ================= */
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">My Bookings</h1>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Provider</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.bookingId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">#{b.bookingId}</td>
                  <td className="px-4 py-2">{b.service}</td>
                  <td className="px-4 py-2">{b.serviceProvider}</td>
                  <td className="px-4 py-2">
                    {new Date(b.scheduledAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">₹{b.price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusBadge(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {b.status === "PENDING" && (
                      <button
                        onClick={() =>
                          updateStatus(b.bookingId, "CANCELLED")
                        }
                        className="text-red-600 underline"
                      >
                        Cancel
                      </button>
                    )}

                    {b.status === "ACCEPTED" && (
                      <button
                        onClick={() => openPayment(b)}
                        className="text-blue-600 underline"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAYMENT POPUP ================= */}
      {paymentPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>

            <p><b>Service:</b> {paymentPopup.booking.service}</p>
            <p><b>Amount:</b> ₹{paymentPopup.booking.price}</p>

            {paymentPopup.status === "SUCCESS" ? (
              <p className="text-green-600 mt-3">Payment Completed</p>
            ) : (
              <button
                onClick={payNow}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                Pay Now
              </button>
            )}

            <div className="mt-4 text-right">
              <button
                onClick={() => setPaymentPopup(null)}
                className="text-gray-600 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
