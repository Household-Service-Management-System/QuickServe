import "./PendingRequest.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PendingRequest() {

  const [requests, setRequests] = useState([
    { id: 1, name: "ABV", email: "ab@gmail.com", status: "" }
  ]);

  // ACCEPT → Show Green Tick
  const handleAccept = (id) => {
    setRequests(
      requests.map(r =>
        r.id === id ? { ...r, status: "accepted" } : r
      )
    );
  };

  // REJECT → Show Red Cross
  const handleReject = (id) => {
    setRequests(
      requests.map(r =>
        r.id === id ? { ...r, status: "rejected" } : r
      )
    );
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item active">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

       <Link to="/admin/logout">
  <button className="logout-btn">Logout</button>
</Link>

      </aside>

      {/* MAIN CONTENT */}
      <main className="content">

        <h1 className="page-title">Pending Requests</h1>
  <input
          type="text"
          className="search-bar"
          placeholder="Search..."
        />
        <div className="card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>View Document</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>

                  <td>
                    <Link to="/admin/serviceProviderDetail">
                      <button className="view-btn">View</button>
                    </Link>
                  </td>

                  <td>
                    {/* BEFORE ACTION */}
                    {req.status === "" && (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleAccept(req.id)}
                        >
                          Accept
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* AFTER ACTION */}
                    {req.status === "accepted" && (
                      <span style={{ color: "green", fontSize: "20px" }}>
                        ✅ Accepted
                      </span>
                    )}

                    {req.status === "rejected" && (
                      <span style={{ color: "red", fontSize: "20px" }}>
                        ❌ Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
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
