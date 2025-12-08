import { Link } from "react-router-dom";
import "./Setting.css";
import { useState } from "react";

export default function Setting() {
  const [theme, setTheme] = useState("light");

  // Theme styling for main layout background + text
  const themeStyles = {
    light: { background: "#f3f4f7", color: "#1a1a1a" },
    dark: { background: "#0d1b2a", color: "white" },
    blue: { background: "#1e3a8a", color: "white" },
    green: { background: "#0f5132", color: "white" }
  };

  return (
    <div className="layout" style={themeStyles[theme]}>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item active">Setting</Link>
         

        </nav>
<Link to="/admin/logout">
  <button className="logout-btn">Logout</button>
</Link>

      
      
      </aside>

      {/* Main Content */}
      <main className="content">

        <h1 className="page-title">Theme Settings</h1>

        <div className="theme-card">
          <h2>Select Theme</h2>

          <div className="theme-options">

            {/* LIGHT */}
            <button
              className="theme-btn"
              onClick={() => setTheme("light")}
            >
              <span className="theme-preview light-preview"></span>
              Light Theme
            </button>

            {/* DARK */}
            <button
              className="theme-btn"
              onClick={() => setTheme("dark")}
            >
              <span className="theme-preview dark-preview"></span>
              Dark Theme
            </button>

            {/* BLUE */}
            <button
              className="theme-btn"
              onClick={() => setTheme("blue")}
            >
              <span className="theme-preview blue-preview"></span>
              Blue Theme
            </button>

            {/* GREEN */}
            <button
              className="theme-btn"
              onClick={() => setTheme("green")}
            >
              <span className="theme-preview green-preview"></span>
              Green Theme
            </button>

          </div>
        </div>

        {/* Back Button */}
        <div className="back-container">
          <Link to="/admin">
            <button className="back-btn">Back</button>
          </Link>
        </div>

      </main>
    </div>
  );
}
