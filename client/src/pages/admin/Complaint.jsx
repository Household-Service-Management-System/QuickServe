import "./Complaint.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllComplaints } from "../../api/adminService";

export default function Complaint() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);

        // 🔐 handle unauthorized access
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredComplaints = complaints.filter((c) =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/complaint" className="menu-item active">Complaint</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
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

      {/* MAIN CONTENT */}
      <main className="content">
        <h1 className="page-title">Customer Complaints</h1>

        {/* SEARCH */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
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
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
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
                      <td>
                        <Link to={`/admin/viewComplaint/${c.id}`}>
                          <button className="view-btn">View</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BACK */}
        <div className="back-container">
          <Link to="/admin">
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
