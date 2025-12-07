import "./PaymentList.css";
import { Link } from "react-router-dom";

export default function PaymentList() {
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

        <h1 className="page-title">Payment Records</h1>

        {/* TABLE CARD */}
        <div className="card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>TR ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Satus</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>ABV</td>
                <td>Ab@gmail.com</td>
                <td>UPI</td>
                <td>300</td>
                <td>success</td>
              </tr>
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="total-row">TOTAL : 300</div>
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
