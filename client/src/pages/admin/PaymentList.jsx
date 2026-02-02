
import "./PaymentList.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaymentRecords } from "../../api/adminService";

export default function PaymentList() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentRecords()
      .then((response) => {
        console.log("PAYMENTS 👉", response.data);
        setPayments(response.data || []);
      })
      .catch((error) => {
        console.error("Payment API error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  //filter payments based on search
  const filteredPayments = payments.filter((p) =>
    `${p.transactionId} ${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  //calculate summary amounts
  const receivedAmount = filteredPayments
    .filter((p) => p.bookingStatus === "COMPLETED")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const pendingAmount = filteredPayments
    .filter((p) => p.bookingStatus === "ACCEPTED")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const failedAmount = filteredPayments
    .filter((p) => p.bookingStatus === "CANCELLED")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Payments...</h2>;
  }

  return (
    <div className="layout">



      <main className="content">
        <h1 className="page-title">Payment Records</h1>

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
          placeholder="Search by name or transaction ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <div className="card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Customer Name</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((p) => (
                    <tr key={p.bookingId}>
                      <td>{p.transactionId}</td>
                      <td>{p.firstName} {p.lastName}</td>
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
          <Link to="/admin/dashboard">
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
