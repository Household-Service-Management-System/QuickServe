
import "./Complaint.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllComplaints,
  startComplaint,
  resolveComplaint,
  rejectComplaint,
} from "../../api/adminService";

export default function Complaint() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data))
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredComplaints = complaints.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status } : c
      )
    );
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/complaint" className="menu-item active">Complaint</Link>
          <Link to="/admin/service-providers" className="menu-item">Service Provider</Link>
          <Link to="/admin/pending-requests" className="menu-item">Pending Request</Link>
          <Link to="/admin/payment-list" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
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

      {/* MAIN */}
      <main className="content">
        <h1 className="page-title">Customer Complaints</h1>

        <input
          className="search-bar"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No Complaints Found
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.firstName} {c.lastName}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>

                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        {c.status === "OPEN" && (
                          <>
                            <button
                              className="action-btn start"
                              onClick={async () => {
                                await startComplaint(c.id);
                                updateStatus(c.id, "IN_PROGRESS");
                              }}
                            >
                              Start
                            </button>

                            <button
                              className="action-btn reject"
                              onClick={async () => {
                                await rejectComplaint(c.id);
                                updateStatus(c.id, "REJECT");
                              }}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {c.status === "IN_PROGRESS" && (
                          <button
                            className="action-btn resolve"
                            onClick={async () => {
                              await resolveComplaint(c.id);
                              updateStatus(c.id, "RESOLVED");
                            }}
                          >
                            Resolve
                          </button>
                        )}

                        {(c.status === "RESOLVED" || c.status === "REJECT") && (
                          <span style={{ color: "#999" }}>—</span>
                        )}
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
