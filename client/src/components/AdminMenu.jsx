import { Link, useLocation } from "react-router-dom";
import "./AdminMenu.css";

export default function AdminMenu() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-menu">
      <h3 className="menu-title">Admin Panel</h3>

      <ul>
        <li className={isActive("/admin/dashboard") ? "active" : ""}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li className={isActive("/admin/pending-requests") ? "active" : ""}>
          <Link to="/admin/pending-requests">Pending Requests</Link>
        </li>

        <li className={isActive("/admin/complaints") ? "active" : ""}>
          <Link to="/admin/complaints">Complaints</Link>
        </li>

        <li className={isActive("/admin/service-providers") ? "active" : ""}>
          <Link to="/admin/service-providers">Service Providers</Link>
        </li>

        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
