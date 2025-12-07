import "./ServiceProviderDetail.css";
import { Link } from "react-router-dom";
export default function ServiceProviderDetail() {
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

        {/* DETAILS CARD */}
        <div className="detail-card">

          {/* LEFT DETAILS */}
          <div className="info-section">
            <p>Sr/C ID : - 101</p>
            <p>Name : - AB Worker</p>
            <p>Rating : - 4.5</p>
            <p>Date of Joining : - 2023-01-12</p>
            <p>Contact No : - 9876543210</p>
            <p>Email : - abworker@gmail.com</p>
            <p>Date of Termination : - NA</p>
            <p>Add : - Pune, Maharashtra</p>
            <p>Document : - worker_doc.pdf</p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="image-section">
            <div className="img-box">
              <img
                src="https://i.ibb.co/zxCq1rP/smiley.png"
                alt="profile"
              />
            </div>
          </div>

        </div>

        {/* BACK BUTTON */}
       <div className="back-container">
  <Link to="/admin">
    <button className="back-btn">Back</button>
  </Link>
</div>

      </main>
    </div>
  );
}
