import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const USER_ID = 4; // replace later with auth

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  /* ================= LOAD RAZORPAY ================= */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const [bookingRes, paymentRes] = await Promise.all([
        axios.get(`http://localhost:8080/customer/bookings/${USER_ID}`),
        axios.get(`http://localhost:8080/customer/paymentByUser/${USER_ID}`),
      ]);

      setBookings(bookingRes.data || []);
      setPayments(paymentRes.data || []);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= HELPERS ================= */
  const isPaid = (bookingId) =>
  payments.some(
    (p) =>
      p.bookingId === bookingId &&
      p.status &&
      p.status.toUpperCase() === "SUCCESS"
  );

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

  /* ================= CANCEL ================= */
  const cancelBooking = async (id) => {
    await axios.put(
      `http://localhost:8080/customer/booking/${id}/CANCELLED`
    );
    fetchData();
  };

  /* ================= PAY ================= */
  const payNow = async (booking) => {
  setPayingId(booking.bookingId);

  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay failed to load");
    setPayingId(null);
    return;
  }

  try {
    /* 1️⃣ Create Razorpay order */
    const orderRes = await axios.post(
      "http://localhost:8080/payment/create-order",
      {
        bookingId: booking.bookingId,
        amount: booking.price,
      }
    );

    const order = orderRes.data;

    /* 2️⃣ Razorpay options */
    const options = {
      key: order.razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "QuickServe",
      description: booking.service,
      order_id: order.orderId,

      handler: async (response) => {
        try {
          /* 3️⃣ SAVE PAYMENT (DTO aligned) */
          await axios.post(
            "http://localhost:8080/customer/paymentAddByBooking",
            {
              bookingId: booking.bookingId,
              amount: booking.price,
              method: "UPI", // ✅ enum-safe
              transactionId: response.razorpay_payment_id,
              status: "SUCCESS",
            }
          );

          /* 4️⃣ UPDATE BOOKING STATUS */
          await axios.put(
            `http://localhost:8080/customer/booking/${booking.bookingId}/COMPLETED`
          );

          alert("Payment successful 🎉");

          /* 5️⃣ Refresh UI */
          setTimeout(() => {
            fetchData();
          }, 300);

        } catch (err) {
          console.error("Post-payment error", err);
          alert("Payment saved failed");
        }
      },

      theme: { color: "#2563eb" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  } finally {
    setPayingId(null);
  }
};


  /* ================= UI ================= */
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Provider</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => {
                const paid = isPaid(b.bookingId);

                return (
                  <tr key={b.bookingId} className="border-t">
                    <td className="p-3">#{b.bookingId}</td>
                    <td className="p-3">{b.service}</td>
                    <td className="p-3">{b.serviceProvider}</td>
                    <td className="p-3">
                      {new Date(b.scheduledAt).toLocaleString()}
                    </td>
                    <td className="p-3">₹{b.price}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${statusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* PAYMENT STATUS */}
                    <td className="p-3">
                      {paid ? (
                        <span className="flex items-center text-green-600 gap-1">
                          <CheckCircleIcon className="w-4 h-4" />
                          Paid
                        </span>
                      ) : (
                        <span className="text-yellow-600">Unpaid</span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="p-3 space-x-3">
                      {b.status === "PENDING" && (
                        <button
                          onClick={() => cancelBooking(b.bookingId)}
                          className="text-red-600 underline"
                        >
                          Cancel
                        </button>
                      )}

                      {!paid &&
                        (b.status === "PENDING" ||
                          b.status === "ACCEPTED") && (
                          <button
                            onClick={() => payNow(b)}
                            disabled={payingId === b.bookingId}
                            className="text-blue-600 underline"
                          >
                            {payingId === b.bookingId
                              ? "Processing..."
                              : "Pay"}
                          </button>
                        )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
