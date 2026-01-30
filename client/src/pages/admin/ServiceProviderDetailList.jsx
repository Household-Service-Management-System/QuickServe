import "./ServiceProviderDetailList.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

export default function ServiceProviderDetail() {

  const { id } = useParams(); // 👈 dynamic ID from URL
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/admin/serviceProviderDetail/${id}`)
      .then((response) => {
        setProvider(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service provider details", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (!provider) return <h2 style={{ padding: "20px" }}>No Data Found</h2>;

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
          <Link to="/admin/pendingRequest" className="menu-item">
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
        <h1 className="page-title">Service Provider Details</h1>

        <div className="detail-card">

          <div className="info-section">
            <p><strong>Name :</strong> {provider.firstName} {provider.lastName}</p>
            <p><strong>Email :</strong> {provider.email}</p>
            <p><strong>Phone :</strong> {provider.phone}</p>
            <p><strong>Role :</strong> {provider.role}</p>
            <p><strong>Address :</strong> {provider.address || "NA"}</p>
            <p><strong>Gov ID Type :</strong> {provider.govIdType}</p>
            <p><strong>Gov ID :</strong> {provider.govId}</p>
            <p>
              <strong>Certification :</strong>{" "}
              {provider.certification ? provider.certification : "Not Uploaded"}
            </p>
          </div>

        </div>

        {/* BACK */}
        <div className="back-container">
          <Link to="/admin/pendingRequest">
            <button className="back-btn">Back</button>
          </Link>
        </div>

      </main>
    </div>
  );
}
