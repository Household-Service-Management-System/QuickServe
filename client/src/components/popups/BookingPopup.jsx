export default function BookingPopup({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Booking #{booking.bookingId}
        </h2>

        <div className="space-y-2 text-sm">
          <p><b>Service:</b> {booking.serviceName}</p>
          <p><b>Provider:</b> {booking.providerName}</p>
          <p><b>Amount:</b> ₹{booking.amount}</p>
          <p><b>Status:</b> {booking.status}</p>
          <p><b>Transaction:</b> {booking.transactionId || "N/A"}</p>
        </div>

      </div>
    </div>
  );
}
