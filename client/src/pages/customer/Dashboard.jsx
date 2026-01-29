import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

//import { useSelector } from "react-redux";

const USER_ID = 4; // replace later with auth context

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, paymentsRes] = await Promise.all([
        axios.get(`http://localhost:8080/customer/bookings/${USER_ID}`),
        axios.get(`http://localhost:8080/customer/paymentByUser/${USER_ID}`),
      ]);

      setBookings(bookingsRes.data || []);
      setPayments(paymentsRes.data || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;
  const activeBookings = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "ACCEPTED"
  ).length;

  const totalSpent = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((sum, p) => sum + p.amount, 0);

  const upcomingBookings = bookings
    .filter((b) => b.status === "ACCEPTED" || b.status === "PENDING")
    .slice(0, 5);

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: CalendarDaysIcon,
    },
    {
      label: "Active Bookings",
      value: activeBookings,
      icon: ClockIcon,
    },
    {
      label: "Completed Services",
      value: completedBookings,
      icon: CheckCircleIcon,
    },
    {
      label: "Total Spent",
      value: `₹${totalSpent.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Customer Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your bookings and payments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
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

        {/* Upcoming Bookings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Bookings
          </h2>

          {upcomingBookings.length === 0 ? (
            <p className="text-sm text-gray-500">
              No upcoming bookings
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((b, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {b.service}
                    </p>
                    <p className="text-xs text-gray-500">
                      Provider: {b.serviceProvider}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(b.scheduledAt).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-md mt-1 inline-block
                        ${
                          b.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
