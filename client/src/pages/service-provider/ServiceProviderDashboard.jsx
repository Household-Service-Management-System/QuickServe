
import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    ArrowRightIcon,
    WrenchScrewdriverIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

export default function ServiceProviderDashboard() {
    const [query, setQuery] = useState("");

    const stats = [
        { label: "Total Services", value: 150, icon: WrenchScrewdriverIcon },
        { label: "Completed Jobs", value: 100, icon: CheckCircleIcon },
        { label: "Pending Requests", value: 15, icon: ClockIcon },
        { label: "Revenue (30 days)", value: "₹1,25,000", icon: CurrencyRupeeIcon },
    ];

    const services = [
        { name: "AC Repair", requests: 48 },
        { name: "Plumbing", requests: 36 },
        { name: "Painting", requests: 20 },
        { name: "Cleaning", requests: 52 },
    ];

    const bookings = [
        { id: 110, customer: "Amit Verma", service: "AC Repair", date: "Dec 5", time: "10:00–11:00", status: "Confirmed" },
        { id: 111, customer: "Riya Patel", service: "Plumbing", date: "Dec 6", time: "14:00–15:00", status: "Pending" },
        { id: 112, customer: "Suresh Kumar", service: "Electrician", date: "Dec 8", time: "09:00–10:00", status: "Confirmed" },
    ];

    const revenueThisMonth = "₹1,25,000";

    const filtered = bookings.filter(
        (b) =>
            b.customer.toLowerCase().includes(query.toLowerCase()) ||
            b.service.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">


                <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                        <p className="text-sm text-gray-500">Overview of your service performance</p>
                    </div>

                    <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 py-2 w-full md:w-80">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            placeholder="Search customers or bookings..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full text-sm outline-none"
                        />
                    </div>
                </div>


                <div className="bg-white shadow-sm rounded-xl p-4 border mb-5">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">This Month’s Revenue</span>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{revenueThisMonth}</h2>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="text-xl font-semibold text-gray-800">{item.value}</p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Icon className="w-6 h-6 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                    <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Services</h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-xl hover:shadow-md transition flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{service.name}</p>
                                        <p className="text-xs text-gray-500">{service.requests} Requests</p>
                                    </div>

                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <ArrowRightIcon className="w-4 h-4 text-gray-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Bookings</h2>

                        <div className="space-y-3">
                            {filtered.map((booking, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{booking.customer}</p>
                                        <p className="text-xs text-gray-500">{booking.service}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{booking.date}</p>
                                        <p className="text-sm font-semibold">{booking.time}</p>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-md mt-1 inline-block 
                        ${booking.status === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }
                      `}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
