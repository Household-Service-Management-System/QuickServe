import { useState } from "react";
import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth.user);
// const USER_ID = user?.id;

export default function RaiseDispute() {
  const [bookingId, setBookingId] = useState("");
  const [description, setDescription] = useState("");

  const submitDispute = () => {
    if (!bookingId || !description) {
      alert("Please fill all fields");
      return;
    }

    // Backend integration later
    console.log({
      bookingId,
      description,
    });

    alert("Dispute submitted (UI only)");
    setBookingId("");
    setDescription("");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white border rounded-xl shadow-sm p-6">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Raise a Dispute
        </h1>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Booking ID
            </label>
            <input
              type="number"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Booking ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border rounded-lg p-2"
              placeholder="Describe your issue"
            />
          </div>

          <button
            onClick={submitDispute}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Submit Dispute
          </button>

        </div>

      </div>
    </div>
  );
}
