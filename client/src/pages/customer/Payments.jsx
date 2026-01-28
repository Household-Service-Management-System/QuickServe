import { useEffect, useState } from "react";
import axios from "axios";

const USER_ID = 4; // TODO: replace with auth context later

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

  /* ================= PAY NOW (RAZORPAY READY) ================= */
  const handlePayNow = async (payment) => {
  try {
    const orderRes = await axios.post(
      "http://localhost:8080/payment/create-order",
      {
        bookingId: payment.bookingId,
        amount: payment.amount,
      }
    );

    const { orderId, amount, currency, razorpayKey } = orderRes.data;

    const options = {
      key: razorpayKey,
      amount,
      currency,
      order_id: orderId,
      name: "QuickServe",
      description: `Payment for Booking #${payment.bookingId}`,

      handler: async function (response) {
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

        alert("Payment Successful");
        fetchPayments();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Unable to initiate payment");
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
      case "REFUNDED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="p-4 md:p-6 space-y-6">

      <h1 className="text-2xl font-semibold text-gray-800">
        Payments
      </h1>

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
                  <td className="px-4 py-2">{p.method}</td>
                  <td className="px-4 py-2">
                    {p.transactionId || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
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
                <p><b>Scheduled:</b> {selectedBooking.scheduledAt}</p>
                {selectedBooking.rejectionReason && (
                  <p className="text-red-600 mt-2">
                    Reason: {selectedBooking.rejectionReason}
                  </p>
                )}
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
