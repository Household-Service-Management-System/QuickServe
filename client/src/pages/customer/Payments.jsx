import { useEffect, useState } from "react";
import {
  getCustomerPayments,
  getBookingById,
  createRazorpayOrder,
  addPaymentByBooking,
} from "../../api/customerService";

/* ================= HELPER ================= */
// Keep only ONE payment per booking (prefer SUCCESS)
const getLatestPaymentsPerBooking = (payments) => {
  const map = new Map();

  payments.forEach((p) => {
    const bookingId = p.bookingId;
    if (!bookingId) return;

    const existing = map.get(bookingId);

    if (!existing) {
      map.set(bookingId, p);
    } else if (existing.status !== "SUCCESS" && p.status === "SUCCESS") {
      map.set(bookingId, p);
    }
  });

  return Array.from(map.values());
};

export default function CustomerPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [payingId, setPayingId] = useState(null);

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getCustomerPayments();
      setPayments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.warn("Payments fetch failed", err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= BOOKING POPUP ================= */
  const openBookingPopup = async (bookingId) => {
    if (!bookingId) return;

    setBookingLoading(true);
    try {
      const res = await getBookingById(bookingId);
      setSelectedBooking(res.data);
    } catch (err) {
      console.error("Failed to load booking", err);
    } finally {
      setBookingLoading(false);
    }
  };

  const closePopup = () => setSelectedBooking(null);

  /* ================= RAZORPAY ================= */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async (payment) => {
    if (payment.status === "SUCCESS") return;

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      setPayingId(payment.bookingId);

      const orderRes = await createRazorpayOrder(
        payment.bookingId,
        payment.amount
      );

      const order = orderRes.data;

      const options = {
        key: order.razorpayKey,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "QuickServe",
        description: `Booking #${payment.bookingId}`,

        handler: async function (response) {
          // Save / update payment
          await addPaymentByBooking({
            bookingId: payment.bookingId,
            amount: payment.amount,
            method: "UPI",
            transactionId: response.razorpay_payment_id,
            status: "SUCCESS",
          });

          fetchPayments();
        },

        theme: { color: "#2563eb" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment failed");
    } finally {
      setPayingId(null);
    }
  };

  /* ================= UI HELPERS ================= */
  const statusBadge = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700";
      case "INITIATED":
        return "bg-yellow-100 text-yellow-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const finalPayments = getLatestPaymentsPerBooking(payments);

  /* ================= RENDER ================= */
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Payments</h1>

      {/* ================= PAYMENT TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Transaction</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Loading payments...
                </td>
              </tr>
            ) : finalPayments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              finalPayments.map((p) => (
                <tr key={p.paymentId} className="border-t hover:bg-gray-50">
                  <td
                    className="px-4 py-2 text-blue-600 underline cursor-pointer"
                    onClick={() => openBookingPopup(p.bookingId)}
                  >
                    #{p.bookingId}
                  </td>

                  <td className="px-4 py-2">₹{p.amount}</td>
                  <td className="px-4 py-2">{p.method || "-"}</td>
                  <td className="px-4 py-2">{p.transactionId || "-"}</td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusBadge(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    {p.status === "SUCCESS" ? (
                      "—"
                    ) : (
                      <button
                        onClick={() => handlePayNow(p)}
                        disabled={payingId === p.bookingId}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        {payingId === p.bookingId
                          ? "Processing..."
                          : "Pay Now"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= BOOKING POPUP ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

            {bookingLoading ? (
              <p className="text-gray-500">Loading booking...</p>
            ) : (
              <>
                <p><b>Service:</b> {selectedBooking.service || "-"}</p>
                <p><b>Provider:</b> {selectedBooking.serviceProvider || "-"}</p>
                <p><b>Price:</b> ₹{selectedBooking.price || 0}</p>
                <p><b>Status:</b> {selectedBooking.status}</p>
                <p>
                  <b>Scheduled:</b>{" "}
                  {selectedBooking.scheduledAt
                    ? new Date(
                        selectedBooking.scheduledAt
                      ).toLocaleString()
                    : "-"}
                </p>
              </>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={closePopup}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
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
