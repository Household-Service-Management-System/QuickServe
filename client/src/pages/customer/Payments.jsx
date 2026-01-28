import { useEffect, useState } from "react";
import axios from "axios";

//import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth.user);
// const USER_ID = user?.id;
const USER_ID = 4; // replace later with auth user

export default function CustomerPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/customer/paymentByUser/${USER_ID}`
      );
      setPayments(res.data || []);
    } catch (err) {
      console.error("Failed to load payments", err);
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
      const res = await axios.get(
        `http://localhost:8080/customer/booking/bookingId/${bookingId}`
      );
      setSelectedBooking(res.data);
    } catch (err) {
      console.error("Failed to load booking", err);
    } finally {
      setBookingLoading(false);
    }
  };

  const closePopup = () => {
    setSelectedBooking(null);
  };

  /* ================= RAZORPAY ================= */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async (payment) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ Create order
      const orderRes = await axios.post(
        "http://localhost:8080/payment/create-order",
        {
          bookingId: payment.bookingId,
          amount: payment.amount,
        }
      );

      const order = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "QuickServe",
        description: `Booking #${payment.bookingId}`,
        handler: async function (response) {
          // 3️⃣ Verify payment
          await axios.post(
            "http://localhost:8080/payment/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: payment.bookingId,
              amount: payment.amount,
            }
          );

          alert("Payment successful 🎉");
          fetchPayments();
        },
        prefill: {
          name: "Customer",
          email: "customer@test.com",
          contact: "9999999999",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
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
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td
                    className="px-4 py-2 text-blue-600 underline cursor-pointer"
                    onClick={() => openBookingPopup(p.bookingId)}
                  >
                    #{p.bookingId}
                  </td>
                  <td className="px-4 py-2">₹{p.amount}</td>
                  <td className="px-4 py-2">{p.method || "-"}</td>
                  <td className="px-4 py-2">
                    {p.transactionId || "-"}
                  </td>
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
                    {p.status === "INITIATED" ? (
                      <button
                        onClick={() => handlePayNow(p)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Pay Now
                      </button>
                    ) : (
                      "-"
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
            <h2 className="text-lg font-semibold mb-4">
              Booking Details
            </h2>

            {bookingLoading ? (
              <p className="text-gray-500">Loading booking...</p>
            ) : (
              <>
                <p><b>Service:</b> {selectedBooking.service}</p>
                <p><b>Provider:</b> {selectedBooking.serviceProvider}</p>
                <p><b>Price:</b> ₹{selectedBooking.price}</p>
                <p><b>Status:</b> {selectedBooking.status}</p>
                <p>
                  <b>Scheduled:</b>{" "}
                  {new Date(
                    selectedBooking.scheduledAt
                  ).toLocaleString()}
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
