import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
// or Sidebar.css if you separate later

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin/dashboard" className="menu-item">
            Dashboard
          </Link>
          <Link to="/admin/complaint" className="menu-item">
            Complaint
          </Link>
          <Link to="/admin/service-providers" className="menu-item">
            Service Provider
          </Link>
          <Link to="/admin/pending-requests" className="menu-item">
            Pending Request
          </Link>
          <Link to="/admin/payment-list" className="menu-item">
            Payment
          </Link>
          <Link to="/admin/settings" className="menu-item">
            Setting
          </Link>
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
        <Outlet />
      </main>
    </div>
  );
}
