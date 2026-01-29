
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

export default function ServiceRequest() {
    // const navigate = useNavigate();
    const providerId = 2; // TODO: replace with auth context later

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/service-provider/bookings/${providerId}`
            );
            setRequests(res.data);
        } catch (err) {
            console.error("Failed to fetch service requests", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (bookingId) => {
        try {
            await axios.patch(
                `http://localhost:8080/service-provider/bookings/${bookingId}/accept`
            );

            setRequests((prev) =>
                prev.map((r) =>
                    r.bookingId === bookingId
                        ? { ...r, status: "ACCEPTED" }
                        : r
                )
            );
        } catch (err) {
            alert("Failed to accept booking");
        }
    };

    const handleReject = async (bookingId) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            await axios.patch(
                `http://localhost:8080/service-provider/bookings/${bookingId}/reject`,
                reason,
                { headers: { "Content-Type": "text/plain" } }
            );

            setRequests((prev) =>
                prev.map((r) =>
                    r.bookingId === bookingId
                        ? { ...r, status: "REJECTED" }
                        : r
                )
            );
        } catch (err) {
            alert("Failed to reject booking");
        }
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "ACCEPTED":
                return "bg-blue-100 text-blue-700";
            case "COMPLETED":
                return "bg-green-100 text-green-700";
            case "REJECTED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };


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

    if (loading) {
        return <div className="text-center py-10">Loading service requests...</div>;
    }


    // return (
    //     <div className="w-full">

    //         <h1 className="text-2xl font-bold text-gray-900 mb-5">Service Requests</h1>

    //         <div className="bg-white rounded-xl shadow-md p-6">

    //             <div className="overflow-x-auto rounded-lg border border-gray-200">
    //                 <table className="w-full text-left text-sm">
    //                     <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
    //                         <tr>
    //                             <th className="py-3 px-4">Customer</th>
    //                             <th className="py-3 px-4">Service</th>
    //                             <th className="py-3 px-4">Date</th>
    //                             <th className="py-3 px-4">Amount</th>
    //                             <th className="py-3 px-4">Status</th>
    //                             <th className="py-3 px-4 text-right">Actions</th>
    //                         </tr>
    //                     </thead>

    //                     <tbody>
    //                         {requests.map((r) => (
    //                             <tr key={r.id} className="border-b hover:bg-gray-50 transition">
    //                                 <td className="py-3 px-4">{r.customer}</td>
    //                                 <td className="py-3 px-4">{r.service}</td>
    //                                 <td className="py-3 px-4">{r.date}</td>
    //                                 <td className="py-3 px-4">{r.amount}</td>

    //                                 <td className="py-3 px-4">
    //                                     <span
    //                                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
    //                                             r.status
    //                                         )}`}
    //                                     >
    //                                         {r.status}
    //                                     </span>
    //                                 </td>

    //                                 <td className="py-3 px-4 text-right space-x-2">
    //                                     <button
    //                                         onClick={() => alert("View details (placeholder)")}
    //                                         className="text-blue-600 hover:underline text-sm"
    //                                     >
    //                                         View
    //                                     </button>

    //                                     <button
    //                                         onClick={() => alert("Accept (placeholder)")}
    //                                         className="text-green-600 hover:underline text-sm"
    //                                     >
    //                                         Accept
    //                                     </button>

    //                                     <button
    //                                         onClick={() => alert("Reject (placeholder)")}
    //                                         className="text-red-600 hover:underline text-sm"
    //                                     >
    //                                         Reject
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>

    //             </div>
    //         </div>

    //     </div>
    // );

    return (
        <>

            <div className="w-full">

                <h1 className="text-2xl font-bold text-gray-900 mb-5">
                    Service Requests
                </h1>

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
                                {requests.map((r) => {
                                    const { date, time } = formatDateTime(r.date);

                                    return (
                                        <tr
                                            key={r.bookingId}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="py-3 px-4">{r.customerName}</td>

                                            <td className="py-3 px-4">{r.serviceName}</td>

                                            <td className="py-3 px-4">
                                                <div>{date}</div>
                                                <div className="text-xs text-gray-500">{time}</div>
                                            </td>

                                            <td className="py-3 px-4">₹{r.amount}</td>

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
                                                    onClick={() => setSelectedBooking(r)}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    View
                                                </button>

                                                {r.status === "PENDING" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAccept(r.bookingId)}
                                                            className="text-green-600 hover:underline text-sm"
                                                        >
                                                            Accept
                                                        </button>

                                                        <button
                                                            onClick={() => handleReject(r.bookingId)}
                                                            className="text-red-600 hover:underline text-sm"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>




            {selectedBooking && (() => {
                const { date, time } = formatDateTime(selectedBooking.date);

                return (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        onClick={() => setSelectedBooking(null)}
                    >
                        <div
                            className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

                            <div className="space-y-2 text-sm">
                                <p><b>Customer:</b> {selectedBooking.customerName}</p>
                                <p><b>Service:</b> {selectedBooking.serviceName}</p>
                                <p><b>Date:</b> {date}</p>
                                <p><b>Time:</b> {time}</p>
                                <p><b>Amount:</b> ₹{selectedBooking.amount}</p>
                                <p><b>Status:</b> {selectedBooking.status}</p>
                            </div>

                            <div className="mt-5 text-right">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}


        </>
    );

}
