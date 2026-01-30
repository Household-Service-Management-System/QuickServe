import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalServiceProviders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
         <Link to="/admin/dashboard" className="menu-item active">Dashboard</Link>
        <Link to="/admin/complaint" className="menu-item">Complaint</Link>
        <Link to="/admin/service-providers" className="menu-item">Service Provider</Link>
        <Link to="/admin/pending-requests" className="menu-item">Pending Request</Link>
        <Link to="/admin/payment-list" className="menu-item">Payment</Link>
        <Link to="/admin/settings" className="menu-item">Setting</Link>

        </nav>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1 className="page-title">Dashboard Overview</h1>

        <div className="stats-grid">
          <Link to="/admin/service-providers" className="stat-link">
            <div className="stat-box clickable">
              <h3>Total Service Providers</h3>
              <p className="stat-value">
                {dashboardData.totalServiceProviders}
              </p>
            </div>
          </Link>

          <Link to="/admin/payment-list" className="stat-link">
            <div className="stat-box clickable">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{dashboardData.totalRevenue}</p>
            </div>
          </Link>


          <Link to="/admin/complaint" className="stat-link">
            <div className="stat-box">
              <h3>Total Complaint</h3>
              <p className="stat-value">{dashboardData.totalCustomers}</p>
            </div>
          </Link>


          <Link to="/admin/pending-requests" className="stat-link">
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
