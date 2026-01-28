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
  const payNow = async () => {
  try {
    // 1️⃣ Create Razorpay Order
    const orderRes = await axios.post(
      "http://localhost:8080/payment/create-order",
      {
        bookingId: paymentPopup.booking.bookingId,
        amount: paymentPopup.booking.price,
      }
    );

    const { orderId, amount, currency, razorpayKey } = orderRes.data;

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key: razorpayKey,
      amount,
      currency,
      order_id: orderId,
      name: "QuickServe",
      description: `Payment for Booking #${paymentPopup.booking.bookingId}`,

      handler: async function (response) {
        // 3️⃣ Verify Payment
        await axios.post(
          "http://localhost:8080/payment/verify",
          {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            bookingId: paymentPopup.booking.bookingId,
            amount: paymentPopup.booking.price,
          }
        );

        alert("Payment Successful");

        setPaymentPopup(null);
        fetchBookings();
      },

      prefill: {
        name: "Customer",
        email: "customer@test.com",
      },

      theme: {
        color: "#2563eb", // blue
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Payment failed to start");
  }
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
