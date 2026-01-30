import React, { useEffect, useState } from "react";
import {
    getMyDisputes,
    createDispute,
} from "../../api/serviceProviderService";

export default function Support() {
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        bookingId: "",
        description: "",
    });

    const [submitting, setSubmitting] = useState(false);

    // ---------------- LOAD MY DISPUTES ----------------
    useEffect(() => {
        loadDisputes();
    }, []);

    const loadDisputes = async () => {
        try {
            const res = await getMyDisputes();
            setDisputes(res.data);
        } catch (err) {
            console.error("Failed to load disputes", err);
        } finally {
            setLoading(false);
        }
    };

    // ---------------- FORM HANDLERS ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.description.trim()) {
            alert("Please describe your issue");
            return;
        }

        try {
            setSubmitting(true);

            await createDispute({
                bookingId: form.bookingId || null,
                description: form.description,
            });

            alert("Support request submitted successfully");

            setForm({ bookingId: "", description: "" });
            loadDisputes();

        } catch (err) {
            console.error(err);
            alert("Failed to submit support request");
        } finally {
            setSubmitting(false);
        }
    };

    // ---------------- STATUS BADGE ----------------
    const statusBadge = (status) => {
        switch (status) {
            case "OPEN":
                return "bg-blue-100 text-blue-700";
            case "IN_PROGRESS":
                return "bg-yellow-100 text-yellow-700";
            case "RESOLVED":
                return "bg-green-100 text-green-700";
            case "REJECTED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading support requests...</div>;
    }

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* ================= MY DISPUTES ================= */}
                <div className="bg-white border rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                        Help & Support
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Track your raised support requests
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-3 text-left">Dispute ID</th>
                                    <th className="p-3 text-left">Booking</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disputes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center text-gray-500">
                                            No support requests raised yet
                                        </td>
                                    </tr>
                                )}

                                {disputes.map((d) => (
                                    <tr key={d.disputeId} className="border-t">
                                        <td className="p-3 font-medium">#{d.disputeId}</td>
                                        <td className="p-3">
                                            {d.bookingId ? `#${d.bookingId}` : "-"}
                                        </td>
                                        <td className="p-3 line-clamp-2">
                                            {d.description}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
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
                    </div>
                </div>

                {/* ================= RAISE NEW ISSUE ================= */}
                <div className="bg-white border rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Raise a New Support Request
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Booking ID (optional)
                            </label>
                            <input
                                type="number"
                                name="bookingId"
                                value={form.bookingId}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg p-2"
                                placeholder="Enter booking ID if applicable"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Describe your issue
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 w-full border rounded-lg p-2"
                                placeholder="Explain your issue in detail..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg"
                            >
                                {submitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
