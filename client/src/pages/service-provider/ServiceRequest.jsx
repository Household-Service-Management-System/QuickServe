
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceRequest() {
    const navigate = useNavigate();

    const requests = [
        { id: 101, customer: "Rohit Sharma", service: "AC Repair", date: "2025-11-20", amount: "₹500", status: "Pending" },
        { id: 102, customer: "Anita Verma", service: "Electrical", date: "2025-11-19", amount: "₹350", status: "Accepted" },
        { id: 103, customer: "Suresh Kumar", service: "Plumbing", date: "2025-11-17", amount: "₹700", status: "Completed" },
    ];

    const getBadgeColor = (status) => {
        if (status === "Pending") return "bg-yellow-100 text-yellow-700";
        if (status === "Accepted") return "bg-blue-100 text-blue-700";
        if (status === "Completed") return "bg-green-100 text-green-700";
        return "bg-gray-100 text-gray-600";
    };

    return (
        <div className="w-full">

            <h1 className="text-2xl font-bold text-gray-900 mb-5">Service Requests</h1>

            <div className="bg-white rounded-xl shadow-md p-6">

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                            <tr>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Service</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((r) => (
                                <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{r.customer}</td>
                                    <td className="py-3 px-4">{r.service}</td>
                                    <td className="py-3 px-4">{r.date}</td>
                                    <td className="py-3 px-4">{r.amount}</td>

                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                                                r.status
                                            )}`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 text-right space-x-2">
                                        <button
                                            onClick={() => alert("View details (placeholder)")}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => alert("Accept (placeholder)")}
                                            className="text-green-600 hover:underline text-sm"
                                        >
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => alert("Reject (placeholder)")}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}
