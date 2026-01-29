
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPayments() {

    const providerId = 2; // TODO: move to auth context later

    const [payments, setPayments] = useState([]);
    const [query, setQuery] = useState("");
    const [period, setPeriod] = useState("All");
    const [loading, setLoading] = useState(true);


    const formatDateTime = (isoDate) => {
        const d = new Date(isoDate);

        const date = d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const time = d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return { date, time };
    };

    //fetching payments 
    const fetchPayments = async () => {
        try {
            let url = `http://localhost:8080/service-provider/payments/${providerId}`;

            if (query || period !== "All") {
                url = `http://localhost:8080/service-provider/payments/${providerId}/search?query=${query}&filter=${period}`;
            }

            const res = await axios.get(url);
            setPayments(res.data);
        } catch (err) {
            console.error("Failed to fetch payments", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        fetchPayments();
    }, [query, period]);


    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    if (loading) {
        return <div className="text-center py-10">Loading payments...</div>;
    }

    return (
        <div className="w-full">

            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Payments
            </h1>

            <div className="bg-white shadow-md rounded-xl p-6">

                {/* SEARCH + FILTER */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search by customer, booking ID, status..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All</option>
                        <option value="Last 7 days">Last 7 days</option>
                        <option value="This month">This month</option>
                    </select>
                </div>

                {/* TOTAL */}
                <div className="mb-4 text-gray-700 font-medium">
                    Total Amount:&nbsp;
                    <span className="font-bold text-gray-900">
                        ₹{totalAmount}
                    </span>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                            <tr>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Booking ID</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Transaction ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((p, idx) => {
                                const { date, time } = formatDateTime(p.date);

                                return (
                                    <tr
                                        key={idx}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="py-3 px-4">
                                            <div>{date}</div>
                                            <div className="text-xs text-gray-500">{time}</div>
                                        </td>

                                        <td className="py-3 px-4">
                                            {p.customerName}
                                        </td>

                                        <td className="py-3 px-4">
                                            {p.bookingId}
                                        </td>

                                        <td className="py-3 px-4">
                                            ₹{p.amount}
                                        </td>

                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === "PAID"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {p.status}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4">
                                            {p.transactionId || "-"}
                                        </td>
                                    </tr>
                                );
                            })}

                            {payments.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No payments found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
}
