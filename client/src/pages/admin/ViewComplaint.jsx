import "./ViewComplaint.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

export default function ComplaintMoreDetail() {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Fetch complaint details
  useEffect(() => {
    axiosInstance
      .get(`/admin/compailntMoreDetail/${id}`)
      .then((res) => {
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaint detail", err);
        setLoading(false);
      });
  }, [id]);

  // 🔹 Submit admin response
  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      alert("Please enter a response");
      return;
    }

    setSubmitting(true);

    axiosInstance
      .post(
        `/admin/${id}/respose`,   // ✅ BACKEND URL
        responseText,            // ✅ PLAIN STRING BODY
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )
      .then(() => {
        alert("Response submitted successfully ✅");
        setResponseText("");
      })
      .catch((err) => {
        console.error("Error submitting response", err);
        alert("Failed to submit response ❌");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (!detail) return <h2 style={{ padding: "20px" }}>No Data Found</h2>;

  return (
    <div className="layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <nav className="menu">
          <Link to="/admin" className="menu-item">Dashboard</Link>
          <Link to="/admin/complaint" className="menu-item active">Customer</Link>
          <Link to="/admin/serviceProvider" className="menu-item">Service Provider</Link>
          <Link to="/admin/pendingRequest" className="menu-item">Pending Request</Link>
          <Link to="/admin/paymentList" className="menu-item">Payment</Link>
          <Link to="/admin/setting" className="menu-item">Setting</Link>
        </nav>

        <Link to="/admin/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="content">
        <h1 className="page-title">Complaint Detailed View</h1>

        <div className="two-section">
          {/* ===== COMPLAINT DETAILS ===== */}
          <div className="detail-card">
            <h3 className="section-title">Complaint / Customer Details</h3>

            <div className="detail-grid">
              <div className="detail-label">Complaint ID</div>
              <div className="detail-value">{detail.disputeId}</div>

              <div className="detail-label">Status</div>
              <div className="detail-value">
                <span className={`status ${detail.disputeStatus.toLowerCase()}`}>
                  {detail.disputeStatus}
                </span>
              </div>

              <div className="detail-label">Customer</div>
              <div className="detail-value">
                {detail.customerFirstName} {detail.customerLastName}
              </div>

              <div className="detail-label">Email</div>
              <div className="detail-value">{detail.customerEmail}</div>

              <div className="detail-label">Phone</div>
              <div className="detail-value">{detail.customerPhone}</div>

              <div className="detail-label">Booking Status</div>
              <div className="detail-value">{detail.bookingStatus}</div>

              <div className="detail-label">Price</div>
              <div className="detail-value">₹ {detail.price}</div>

              <div className="description-box">
                <strong>Description</strong>
                <p>{detail.disputeDescription}</p>
              </div>
            </div>
          </div>

          {/* ===== SERVICE PROVIDER ===== */}
          <div className="detail-card">
            <h3 className="section-title">Service Provider Details</h3>

            <div className="detail-grid">
              <div className="detail-label">Provider ID</div>
              <div className="detail-value">{detail.serviceProviderId}</div>

              <div className="detail-label">Name</div>
              <div className="detail-value">
                {detail.providerFirstName || "Not Available"}
              </div>

              <div className="detail-label">Email</div>
              <div className="detail-value">{detail.providerEmail || "NA"}</div>

              <div className="detail-label">Phone</div>
              <div className="detail-value">{detail.providerPhone || "NA"}</div>

              <div className="detail-label">Verification</div>
              <div className="detail-value">
                {detail.verificationStatus ? "Verified ✅" : "Not Verified ❌"}
              </div>
            </div>
          </div>
        </div>

        {/* ===== ADMIN RESPONSE ===== */}
        <div className="response-card">
          <h3 className="section-title">Admin Response</h3>

          <textarea
            className="response-textarea"
            placeholder="Write your response to the complaint..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />

          <button
            className="submit-btn"
            onClick={handleSubmitResponse}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Response"}
          </button>
        </div>

        {/* ===== BACK BUTTON ===== */}
        <div className="back-container">
          <Link to="/admin/complaint">
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
