
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//     MagnifyingGlassIcon,
//     WrenchScrewdriverIcon,
//     CheckCircleIcon,
//     ClockIcon,
//     CurrencyRupeeIcon,
// } from "@heroicons/react/24/outline";

// export default function ServiceProviderDashboard() {
//     const providerId = 2; // TODO: replace with auth context

//     const [query, setQuery] = useState("");
//     const [loading, setLoading] = useState(true);

//     const [statsData, setStatsData] = useState(null);
//     const [popularServices, setPopularServices] = useState([]);
//     const [bookings, setBookings] = useState([]);


//     useEffect(() => {
//         fetchDashboardData();
//     }, []);


//     const fetchDashboardData = async () => {
//         try {
//             const [statsRes, servicesRes, bookingsRes] = await Promise.all([
//                 axios.get(`http://localhost:8080/service-provider/dashboard/${providerId}`),
//                 axios.get(`http://localhost:8080/service-provider/dashboard/${providerId}/popular-services`),
//                 axios.get(`http://localhost:8080/service-provider/bookings/${providerId}/upcoming?page=0&size=5`)
//             ]);

//             setStatsData(statsRes.data);
//             setPopularServices(servicesRes.data);
//             setBookings(bookingsRes.data.content);
//         } catch (err) {
//             console.error("Dashboard load failed", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex h-screen items-center justify-center">
//                 Loading Dashboard...
//             </div>
//         );
//     }
//     const stats = [
//         {
//             label: "Total Services",
//             value: statsData?.totalServices ?? 0,
//             icon: WrenchScrewdriverIcon
//         },
//         {
//             label: "Completed Jobs",
//             value: statsData?.completedJobs ?? 0,
//             icon: CheckCircleIcon
//         },
//         {
//             label: "Pending Requests",
//             value: statsData?.pendingRequests ?? 0,
//             icon: ClockIcon
//         },
//         {
//             label: "Revenue (30 days)",
//             value: `₹${(statsData?.monthlyRevenue ?? 0).toLocaleString()}`,
//             icon: CurrencyRupeeIcon
//         }
//     ];

//     const filteredBookings = bookings.filter(
//         (b) =>
//             b.customerName.toLowerCase().includes(query.toLowerCase()) ||
//             b.serviceName.toLowerCase().includes(query.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             <div className="max-w-6xl mx-auto">

//                 {/* Header */}
//                 <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
//                         <p className="text-sm text-gray-500">
//                             Overview of your service performance
//                         </p>
//                     </div>

//                     <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 py-2 w-full md:w-80">
//                         <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
//                         <input
//                             placeholder="Search customers or bookings..."
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                             className="w-full text-sm outline-none"
//                         />
//                     </div>
//                 </div>

//                 {/* Revenue
//                 <div className="bg-white shadow-sm rounded-xl p-4 border mb-5">
//                     <div className="flex justify-between items-center">
//                         <span className="text-gray-500 text-sm">This Month’s Revenue</span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-800 mt-1">
//                         ₹{(statsData?.monthlyRevenue ?? 0).toLocaleString()}
//                     </h2>
//                 </div> */}

//                 {/* Stats cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                     {stats.map((item, index) => {
//                         const Icon = item.icon;
//                         return (
//                             <div
//                                 key={index}
//                                 className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-xs text-gray-500">{item.label}</p>
//                                         <p className="text-xl font-semibold text-gray-800">
//                                             {item.value}
//                                         </p>
//                                     </div>
//                                     <div className="p-2 bg-gray-100 rounded-lg">
//                                         <Icon className="w-6 h-6 text-gray-700" />
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Main grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                     {/* Popular services */}
//                     <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border">
//                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                             Popular Services
//                         </h2>

//                         <div className="grid sm:grid-cols-2 gap-4">
//                             {popularServices.map((service) => (
//                                 <div
//                                     key={service.serviceId}
//                                     className="p-4 border rounded-xl hover:shadow-md transition flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <p className="font-medium text-gray-800">
//                                             {service.serviceName}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                             {service.totalRequests} Requests
//                                         </p>
//                                     </div>

//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Upcoming bookings */}
//                     <div className="bg-white p-5 rounded-xl shadow-sm border">
//                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                             Upcoming Bookings
//                         </h2>

//                         <div className="space-y-3">
//                             {filteredBookings.map((booking) => (
//                                 <div
//                                     key={booking.bookingId}
//                                     className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
//                                 >
//                                     <div>
//                                         <p className="font-medium text-gray-800">
//                                             {booking.customerName}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                             {booking.serviceName}
//                                         </p>
//                                     </div>

//                                     <div className="text-right">
//                                         <p className="text-xs text-gray-500">
//                                             {booking.date}
//                                         </p>
//                                         <p className="text-sm font-semibold">
//                                             {booking.timeSlot}
//                                         </p>

//                                         <span
//                                             className={`text-xs px-2 py-1 rounded-md mt-1 inline-block
//                                                 ${booking.status === "CONFIRMED"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : booking.status === "PENDING"
//                                                         ? "bg-yellow-100 text-yellow-700"
//                                                         : "bg-gray-200 text-gray-700"
//                                                 }`}
//                                         >
//                                             {booking.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    WrenchScrewdriverIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

import {
    getProviderDashboard,
    getPopularServices,
    getUpcomingBookings
} from "../../api/serviceProviderService";

export default function ServiceProviderDashboard() {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const [statsData, setStatsData] = useState(null);
    const [popularServices, setPopularServices] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, servicesRes, bookingsRes] = await Promise.all([
                getProviderDashboard(),
                getPopularServices(),
                getUpcomingBookings(0, 5),
            ]);

            setStatsData(statsRes.data);
            setPopularServices(servicesRes.data);
            setBookings(bookingsRes.data.content);

        } catch (err) {
            console.error("Dashboard load failed", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    const stats = [
        {
            label: "Total Services",
            value: statsData?.totalServices ?? 0,
            icon: WrenchScrewdriverIcon,
        },
        {
            label: "Completed Jobs",
            value: statsData?.completedJobs ?? 0,
            icon: CheckCircleIcon,
        },
        {
            label: "Pending Requests",
            value: statsData?.pendingRequests ?? 0,
            icon: ClockIcon,
        },
        {
            label: "Revenue (30 days)",
            value: `₹${(statsData?.monthlyRevenue ?? 0).toLocaleString()}`,
            icon: CurrencyRupeeIcon,
        },
    ];

    const filteredBookings = bookings.filter(
        (b) =>
            b.customerName.toLowerCase().includes(query.toLowerCase()) ||
            b.serviceName.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                        <p className="text-sm text-gray-500">
                            Overview of your service performance
                        </p>
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

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-xl border shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="text-xl font-semibold text-gray-800">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Icon className="w-6 h-6 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Popular services */}
                    <div className="lg:col-span-2 bg-white p-5 rounded-xl border">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Popular Services
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {popularServices.map((service) => (
                                <div
                                    key={service.serviceId}
                                    className="p-4 border rounded-xl"
                                >
                                    <p className="font-medium text-gray-800">
                                        {service.serviceName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {service.totalRequests} Requests
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming bookings */}
                    <div className="bg-white p-5 rounded-xl border">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Upcoming Bookings
                        </h2>

                        <div className="space-y-3">
                            {filteredBookings.map((booking) => (
                                <div
                                    key={booking.bookingId}
                                    className="flex justify-between items-center p-3 border rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {booking.customerName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {booking.serviceName}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">
                                            {booking.date}
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {booking.timeSlot}
                                        </p>

                                        <span className="text-xs px-2 py-1 rounded-md bg-gray-200">
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
