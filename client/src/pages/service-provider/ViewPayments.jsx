
import React, { useMemo, useState } from "react";

export default function ViewPayments() {
    const payments = [
        { date: "2025-12-05", bookingId: 110, amount: "₹500", status: "Paid", customer: "Amit Verma" },
        { date: "2025-12-03", bookingId: 109, amount: "₹1200", status: "Paid", customer: "Riya Patel" },
        { date: "2025-11-28", bookingId: 105, amount: "₹700", status: "Pending", customer: "John Doe" },
        { date: "2025-11-22", bookingId: 102, amount: "₹900", status: "Paid", customer: "Meera Sharma" },
        { date: "2025-11-18", bookingId: 98, amount: "₹1200", status: "Paid", customer: "Arun Kumar" },
        { date: "2025-11-16", bookingId: 95, amount: "₹700", status: "Pending", customer: "Emily Johnson" },
    ];

    const [period, setPeriod] = useState("last7");
    const [query, setQuery] = useState("");

    const today = new Date();

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return payments.filter((p) => {
            const d = new Date(p.date + "T00:00:00");

            if (period === "last7") {
                const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
                if (diff < 0 || diff > 7) return false;
            } else if (period === "month") {
                if (d.getMonth() !== today.getMonth() || d.getFullYear() !== today.getFullYear()) return false;
            }

            if (!q) return true;
            return (
                String(p.bookingId).includes(q) ||
                p.amount.toLowerCase().includes(q) ||
                p.status.toLowerCase().includes(q) ||
                p.customer.toLowerCase().includes(q)
            );
        });
    }, [payments, period, query, today]);

    const total = useMemo(() => {
        return filtered.reduce((sum, p) => {
            const num = Number(p.amount.replace(/[^0-9.-]+/g, ""));
            return sum + num;
        }, 0);
    }, [filtered]);

    return (
        <div className="w-full">

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>

            <div className="bg-white shadow-md rounded-xl p-6">


                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search payments..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="last7">Last 7 days</option>
                        <option value="month">This month</option>
                        <option value="all">All</option>
                    </select>
                </div>


                <div className="mb-4 text-gray-700 font-medium">
                    Total Amount: <span className="font-bold text-gray-900">₹{total}</span>
                </div>


                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                            <tr>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Booking ID</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Receipt</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((p, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{p.date}</td>
                                    <td className="py-3 px-4">{p.customer}</td>
                                    <td className="py-3 px-4">{p.bookingId}</td>
                                    <td className="py-3 px-4">{p.amount}</td>

                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${p.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                      `}
                                        >
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => alert("Download receipt (placeholder)")}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Download
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
