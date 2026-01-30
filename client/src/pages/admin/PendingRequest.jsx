import "./PendingRequest.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

export default function PendingRequest() {

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/pendingRequests")
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pending requests", error);
        setLoading(false);
      });
  }, []);

  // 🔍 Search filter
  const filteredRequests = requests.filter(r =>
    r.firstName.toLowerCase().includes(search.toLowerCase()) ||
    r.lastName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

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
          <Link to="/admin/pendingRequest" className="menu-item active">
            Pending Request
          </Link>
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
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Pending Requests
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.serviceProviderId}>
                      <td>{req.serviceProviderId}</td>
                      <td>{req.firstName} {req.lastName}</td>
                      <td>{req.email}</td>

                      {/* ONLY VIEW BUTTON */}
                      <td>
                       <Link to={`/admin/serviceProviderDetail/${req.serviceProviderId}`}>
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
