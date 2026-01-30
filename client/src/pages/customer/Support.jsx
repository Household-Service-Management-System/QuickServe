import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function CustomerSupport() {
  const [disputes, setDisputes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    disputeId: null,
    bookingId: "",
    description: "",
    status: "OPEN",
  });

  /* ================= FETCH DATA ================= */

  const fetchDisputes = async () => {
    try {
      const res = await axiosInstance.get("/customer/disputes");
      setDisputes(res.data || []);
    } catch (err) {
      console.error("Failed to fetch disputes", err);
      setDisputes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/customer/bookings");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchDisputes();
    fetchBookings();
  }, []);

  /* ================= SUBMIT ================= */

  const submitDispute = async (e) => {
    e.preventDefault();

    if (!form.bookingId || !form.description) {
      showToast("Please fill all fields");
      return;
    }

    try {
      if (form.disputeId) {
        await axiosInstance.put(
          `/customer/DisputeUpdate/${form.disputeId}`,
          {
            bookingId: form.bookingId,
            description: form.description,
            status: form.status,
          }
        );
        showToast("Dispute updated");
      } else {
        await axiosInstance.post("/customer/DisputeCreate", {
          bookingId: form.bookingId,
          description: form.description,
          status: "OPEN",
        });
        showToast("Dispute raised");
      }

      resetForm();
      fetchDisputes();
    } catch (err) {
      console.error("Dispute operation failed", err);
      showToast("Operation failed");
    }
  };

  /* ================= HELPERS ================= */

  const resetForm = () => {
    setForm({
      disputeId: null,
      bookingId: "",
      description: "",
      status: "OPEN",
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const statusColor = (s) => {
    if (s === "OPEN") return "bg-yellow-100 text-yellow-700";
    if (s === "RESOLVED") return "bg-green-100 text-green-700";
    if (s === "IN_PROGRESS") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  const filteredDisputes =
    filter === "ALL"
      ? disputes
      : disputes.filter((d) => d.status === filter);

  /* ================= UI ================= */

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}

      {/* RAISE ISSUE */}
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Raise Issue
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Report booking or payment related problems
        </p>

        <form onSubmit={submitDispute} className="grid md:grid-cols-3 gap-4">
          <select
            className="border rounded-lg p-2"
            value={form.bookingId}
            onChange={(e) =>
              setForm({ ...form, bookingId: Number(e.target.value) })
            }
          >
            <option value="">Select Booking</option>
            {bookings.map((b) => (
              <option key={b.bookingId} value={b.bookingId}>
                {b.service || b.serviceName} — ₹{b.price || b.amount}
              </option>
            ))}
          </select>

          <input
            className="border rounded-lg p-2 md:col-span-2"
            placeholder="Describe your issue"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="flex gap-2 md:col-span-3 justify-end">
            {form.disputeId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              {form.disputeId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* DISPUTES TABLE */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">My Disputes</h2>
          <select
            className="border rounded-lg p-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="OPEN">OPEN</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading disputes...</p>
        ) : filteredDisputes.length === 0 ? (
          <p className="text-gray-500">No disputes found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Booking</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.map((d) => (
                <tr
                  key={d.disputeId}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setForm({
                      disputeId: d.disputeId,
                      bookingId: d.bookingId,
                      description: d.description,
                      status: d.status,
                    })
                  }
                >
                  <td className="p-2 text-blue-600 underline">
                    #{d.bookingId}
                  </td>
                  <td className="p-2">{d.description}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusColor(
                        d.status
                      )}`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
