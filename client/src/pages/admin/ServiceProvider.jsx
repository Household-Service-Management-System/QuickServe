import "./ServiceProvider.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  getAllServiceProviders,
  deleteServiceProvider,
} from "../../api/adminService";

export default function ServiceProvider() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH PROVIDERS =================
  useEffect(() => {
    getAllServiceProviders()
      .then((res) => {
        setProviders(res.data || []);
      })
      .catch((error) => {
        console.error("Service Providers API error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ================= REMOVE DUPLICATES =================
  // Ensures ONLY ONE row per serviceProviderId
  const uniqueProviders = useMemo(() => {
    const map = new Map();
    providers.forEach((p) => {
      if (!map.has(p.serviceProviderId)) {
        map.set(p.serviceProviderId, p);
      }
    });
    return Array.from(map.values());
  }, [providers]);

  // ================= SEARCH FILTER =================
  const filteredProviders = uniqueProviders.filter((p) =>
    `${p.firstName ?? ""} ${p.lastName ?? ""} ${p.email ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= DELETE HANDLER =================
  const handleDelete = async (serviceProviderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service provider?"
    );
    if (!confirmDelete) return;

    try {
      await deleteServiceProvider(serviceProviderId);

      // Update UI
      setProviders((prev) =>
        prev.filter((p) => p.serviceProviderId !== serviceProviderId)
      );
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (error.response?.status === 403) {
        alert("Access denied ❌");
      } else {
        alert("Delete failed ❌");
      }
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Service Providers...</h2>;
  }

  // ================= UI =================
  return (
    <div className="layout">
      <main className="content">
        <h1 className="page-title">Service Providers</h1>

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
            {filteredProviders.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Service Providers Found
                </td>
              </tr>
            ) : (
              filteredProviders.map((sp) => (
                <tr key={sp.serviceProviderId}>
                  <td>{sp.serviceProviderId}</td>
                  <td>
                    {sp.firstName} {sp.lastName}
                  </td>
                  <td>{sp.email}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          `/admin/service-providers/${sp.serviceProviderId}`
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(sp.serviceProviderId)
                      }
                    >
                      Delete
                    </button>
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
