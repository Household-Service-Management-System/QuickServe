import "./ViewComplaint.css";
import { Link } from "react-router-dom";
export default function ViewComplaint() {
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

      {/* MAIN CONTENT */}
      <main className="content">

        <h1 className="page-title">Dashboard Overview</h1>

        {/* CARD BOX */}
        <div className="complaint-card">

          {/* Top Row (ID + Name) */}
          <div className="info-row">
            <p className="info-text">SR/C ID : - 1</p>
            <p className="info-text">Name : - ABV</p>
          </div>

          {/* Complaint and Response */}
          <div className="two-box-row">

            <div className="box">
              <label className="label">Complaint :</label>
              <textarea className="textarea"></textarea>
            </div>

            <div className="box">
              <label className="label">Response :</label>
              <textarea className="textarea"></textarea>
            </div>

          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button className="submit-btn">Submit</button>
          </div>

        </div>
      </main>
    </div>
  );
}
