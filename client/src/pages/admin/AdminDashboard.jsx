import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalServiceProviders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/dashboard")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item active">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

        <Link to="/admin/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 className="page-title">Dashboard Overview</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
        />

        <div className="stats-grid">

          <Link to="/admin/serviceProvider" className="stat-link">
            <div className="stat-box clickable">
              <h3>Total Service Providers</h3>
              <p className="stat-value">
                {dashboardData.totalServiceProviders}
              </p>
            </div>
          </Link>

          <Link to="/admin/paymentList" className="stat-link">
            <div className="stat-box clickable">
              <h3>Total Revenue</h3>
              <p className="stat-value">
                ₹{dashboardData.totalRevenue}
              </p>
            </div>
          </Link>

          <Link to="/admin/customer" className="stat-link">
            <div className="stat-box clickable">
              <h3>Total Customers</h3>
              <p className="stat-value">
                {dashboardData.totalCustomers}
              </p>
            </div>
          </Link>

          <Link to="/admin/pendingRequest" className="stat-link">
            <div className="stat-box clickable">
              <h3>Pending Requests</h3>
              <p className="stat-value">
                {dashboardData.pendingRequests}
              </p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
