import "./ServiceProviderDetail.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

export default function ServiceProviderDetail() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH ALL SERVICE PROVIDERS
  useEffect(() => {
    axiosInstance
      .get("/admin/service-providers")
      .then((response) => {
        setProviders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service providers", error);
        setLoading(false);
      });
  }, []);

  // ✅ DELETE SERVICE PROVIDER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service provider?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/${id}`);

      // ✅ Remove deleted provider from UI
      setProviders((prev) =>
        prev.filter((provider) => provider.serviceProviderId !== id)
      );

      alert("Service Provider deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete service provider");
    }
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (providers.length === 0)
    return <h2 style={{ padding: "20px" }}>No Service Providers Found</h2>;

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/customer" className="menu-item">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item active">
            Service Provider
          </Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

        <Link to="/admin/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1 className="page-title">Service Provider List</h1>

        {providers.map((provider) => (
          <div className="detail-card" key={provider.serviceProviderId}>
            <div className="info-section">
              <p><b>ID:</b> {provider.serviceProviderId}</p>
              <p><b>Name:</b> {provider.firstName} {provider.lastName}</p>
              <p><b>Email:</b> {provider.email}</p>
              <p><b>Phone:</b> {provider.phone}</p>
              <p><b>Gov ID Type:</b> {provider.govIdType}</p>
              <p><b>Gov ID:</b> {provider.govId}</p>
              <p>
                <b>Status:</b>{" "}
                {provider.verificationStatus ? "Verified ✅" : "Pending ❌"}
              </p>
            </div>

            <div className="image-section">
              <div className="img-box">
                <img
                  src="https://i.ibb.co/zxCq1rP/smiley.png"
                  alt="profile"
                />
              </div>
            </div>

            {/* BACK + DELETE BUTTONS */}
            <div className="back-container">
              <Link to="/admin">
                <button className="back-btn">Back</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(provider.serviceProviderId)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
