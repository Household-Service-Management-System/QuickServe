import "./Complaint.css";
import { useNavigate } from "react-router-dom";
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
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = `${c.firstName} ${c.lastName} ${c.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div className="layout">
      <main className="content">
        <h1 className="page-title">Customer Complaints</h1>

        {/* 🔍 Search & Filter */}
        <div className="filter-row">
          <input
            className="search-bar"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Complaints</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECT">Rejected</option>
          </select>
        </div>

        {/* 📋 Complaints Table */}
        <div className="card">
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Description</th>
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

                      <td>
                        {c.firstName} {c.lastName}
                      </td>

                      <td>{c.email}</td>
                      <td>{c.phone}</td>

                      {/* ✅ DESCRIPTION */}
                      <td className="description-cell">
                        {c.description || "—"}
                      </td>

                      <td>
                        <span className={`status ${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>

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

                        {(c.status === "RESOLVED" ||
                          c.status === "REJECT") && (
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
      </main>
    </div>
  );
}
