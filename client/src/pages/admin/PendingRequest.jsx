import "./PendingRequest.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getPendingRequests } from "../../api/adminService";

export default function PendingRequest() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    getPendingRequests()
      .then((res) => {
        setRequests(res.data || []);
      })
      .catch((error) => {
        console.error("Pending Requests API error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ================= REMOVE DUPLICATES =================
  // Keeps only ONE row per serviceProviderId
  const uniqueRequests = useMemo(() => {
    const map = new Map();
    requests.forEach((req) => {
      if (!map.has(req.serviceProviderId)) {
        map.set(req.serviceProviderId, req);
      }
    });
    return Array.from(map.values());
  }, [requests]);

  // ================= SEARCH FILTER =================
  const filteredRequests = uniqueRequests.filter((r) =>
    `${r.firstName} ${r.lastName} ${r.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Pending Requests...</h2>;
  }

  return (
    <div className="layout">
      <main className="content">
        <h1 className="page-title">Pending Requests</h1>

        {/* SEARCH */}
        <input
          className="search-bar"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
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
                  <td>
                    {req.firstName} {req.lastName}
                  </td>
                  <td>{req.email}</td>
                  <td>
                    <Link
                      to={`/admin/service-providers/${req.serviceProviderId}`}
                    >
                      <button className="view-btn pending-view-btn">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
