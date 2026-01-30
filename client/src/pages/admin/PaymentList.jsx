import "./PaymentList.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/paymentRecords")
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment records", error);
        setLoading(false);
      });
  }, []);

  const filteredPayments = payments.filter((p) =>
    p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
    p.firstName.toLowerCase().includes(search.toLowerCase()) ||
    p.lastName.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ AMOUNT CALCULATIONS
  const receivedAmount = filteredPayments
    .filter(p => p.bookingStatus === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = filteredPayments
    .filter(p => p.bookingStatus === "ACCEPTED")
    .reduce((sum, p) => sum + p.amount, 0);

  const failedAmount = filteredPayments
    .filter(p => p.bookingStatus === "CANCELLED")
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item active">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

        <Link to="/admin/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1 className="page-title">Payment Records</h1>

        {/* ✅ SUMMARY BOXES */}
        <div className="summary-container">
          <div className="summary-box received">
            <p>Received</p>
            <h3>₹ {receivedAmount}</h3>
          </div>

          <div className="summary-box pending">
            <p>Pending</p>
            <h3>₹ {pendingAmount}</h3>
          </div>

          <div className="summary-box failed">
            <p>Failed</p>
            <h3>₹ {failedAmount}</h3>
          </div>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, email or transaction ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((p) => (
                    <tr key={p.transactionId}>
                      <td>{p.transactionId}</td>
                      <td>{p.firstName} {p.lastName}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                      <td>{p.amount}</td>
                      <td>
                        <span className={`status ${p.bookingStatus.toLowerCase()}`}>
                          {p.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="back-container">
          <Link to="/admin">
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
