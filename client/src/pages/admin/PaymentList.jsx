// import "./PaymentList.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getPaymentRecords } from "../../api/adminService";

// export default function PaymentList() {
//   const navigate = useNavigate();

//   const [payments, setPayments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getPaymentRecords()
//       .then((response) => {
//         console.log("PAYMENTS 👉", response.data); // optional debug
//         setPayments(response.data || []);
//       })
//       .catch((error) => {
//         console.error("Payment API error:", error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [navigate]);

//   /* 🔍 FILTER (MATCHES BACKEND DTO) */
//   const filteredPayments = payments.filter((p) =>
//     p.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//     p.customerName?.toLowerCase().includes(search.toLowerCase())
//   );

//   /* 💰 SUMMARY */
//   const receivedAmount = filteredPayments
//     .filter((p) => p.status?.toUpperCase() === "SUCCESS")
//     .reduce((sum, p) => sum + (p.amount ?? 0), 0);

//   const pendingAmount = filteredPayments
//     .filter((p) => p.status?.toUpperCase() === "PENDING")
//     .reduce((sum, p) => sum + (p.amount ?? 0), 0);

//   const failedAmount = filteredPayments
//     .filter((p) => p.status?.toUpperCase() === "FAILED")
//     .reduce((sum, p) => sum + (p.amount ?? 0), 0);

//   if (loading) {
//     return <h2 style={{ padding: "20px" }}>Loading Payments...</h2>;
//   }

//   return (
//     <div className="layout">
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <h2 className="logo">QuickServe</h2>
//         <p className="panel-text">Admin Panel</p>

//         <nav className="menu">
//           <Link to="/admin/dashboard" className="menu-item">Dashboard</Link>
//           <Link to="/admin/service-providers" className="menu-item">Service Provider</Link>
//           <Link to="/admin/pending-requests" className="menu-item">Pending Request</Link>
//           <Link to="/admin/payment-list" className="menu-item active">Payment</Link>
//           <Link to="/admin/settings" className="menu-item">Setting</Link>
//         </nav>

//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/login");
//           }}
//         >
//           Logout
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="content">
//         <h1 className="page-title">Payment Records</h1>

//         {/* SUMMARY */}
//         <div className="summary-container">
//           <div className="summary-box received">
//             <p>Received</p>
//             <h3>₹ {receivedAmount}</h3>
//           </div>

//           <div className="summary-box pending">
//             <p>Pending</p>
//             <h3>₹ {pendingAmount}</h3>
//           </div>

//           <div className="summary-box failed">
//             <p>Failed</p>
//             <h3>₹ {failedAmount}</h3>
//           </div>
//         </div>

//         {/* SEARCH */}
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search by name or transaction ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* TABLE */}
//         <div className="card">
//           <div className="table-wrapper">
//             <table className="custom-table">
//               <thead>
//                 <tr>
//                   <th>Transaction ID</th>
//                   <th>Customer Name</th>
//                   <th>Amount (₹)</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredPayments.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" style={{ textAlign: "center" }}>
//                       No Records Found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredPayments.map((p, index) => (
//                     <tr key={index}>
//                       <td>{p.transactionId}</td>
//                       <td>{p.customerName}</td>
//                       <td>{p.amount ?? 0}</td>
//                       <td>
//                         <span className={`status ${(p.status || "").toLowerCase()}`}>
//                           {p.status || "UNKNOWN"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="back-container">
//           <Link to="/admin/dashboard">
//             <button className="back-btn">Back</button>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }
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

  /* 🔍 FILTER — FIXED */
  const filteredPayments = payments.filter((p) =>
    `${p.transactionId} ${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* 💰 SUMMARY — FIXED */
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
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin/dashboard" className="menu-item">Dashboard</Link>
          <Link to="/admin/service-providers" className="menu-item">Service Provider</Link>
          <Link to="/admin/pending-requests" className="menu-item">Pending Request</Link>
          <Link to="/admin/payment-list" className="menu-item active">Payment</Link>
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
        <h1 className="page-title">Payment Records</h1>

        {/* SUMMARY */}
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

        {/* TABLE */}
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
