import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import {
  getCustomerBookings,
  getCustomerPayments,
  changeBookingStatus,
  addPaymentByBooking,
  createRazorpayOrder,
} from "../../api/customerService";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH DATA ================= */

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const bookingsRes = await getCustomerBookings();
      const paymentsRes = await getCustomerPayments();

      console.log("BOOKINGS API RESPONSE ", bookingsRes.data);
      console.log("PAYMENTS API RESPONSE ", paymentsRes.data);

      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      setPayments(Array.isArray(paymentsRes.data) ? paymentsRes.data : []);
    } catch (err) {
      console.error("FETCH FAILED ", err);
      setError("Failed to load bookings. Check console.");
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
        (p.bookingId === bookingId || p.booking?.bookingId === bookingId) &&
        p.status === "SUCCESS"
    );

  /* ================= UI STATES ================= */

  if (loading) {
    return <p className="p-6 text-gray-500">Loading bookings…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }


  const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const handlePay = async (booking) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    // Create Razorpay order
    const orderRes = await createRazorpayOrder(
      booking.bookingId || booking.id,
      booking.price || booking.amount
    );

    const order = orderRes.data;

    // Razorpay checkout
    const options = {
      key: order.razorpayKey,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "QuickServe",
      description: `Booking #${booking.bookingId}`,

      handler: async function (response) {
        // 3️⃣ Save payment
        await addPaymentByBooking({
          bookingId: booking.bookingId || booking.id,
          amount: booking.price || booking.amount,
          method: "UPI",
          transactionId: response.razorpay_payment_id,
          status: "SUCCESS",
        });

        // Update booking status
        await changeBookingStatus(
          booking.bookingId || booking.id,
          "COMPLETED"
        );

        //Refresh table
        fetchData();
      },

      theme: { color: "#2563eb" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error("Payment failed", err);
    alert("Payment failed");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Bookings</h1>

      {/*TABLE ALWAYS VISIBLE */}
      <table className="w-full text-sm bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">ID</th>
            <th>Service</th>
            <th>Price</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          )}

          {bookings.map((b, index) => {
            const bookingId = b.bookingId || b.id;
            const service =
              b.service || b.serviceName || b.categoryName || "—";
            const price = b.price || b.amount || 0;
            const status = b.status || b.bookingStatus || "—";

            return (
              <tr key={bookingId || index} className="border-t">
                <td className="p-3">#{bookingId}</td>
                <td>{service}</td>
                <td>₹{price}</td>
                <td>{status}</td>

                <td>
                  {isPaid(bookingId) ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircleIcon className="w-4 h-4" />
                      Paid
                    </span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </td>

                <td>
                  {!isPaid(bookingId) && (
                    <button
  className="text-blue-600 underline"
  onClick={() => handlePay(b)}
>
  Pay
</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
