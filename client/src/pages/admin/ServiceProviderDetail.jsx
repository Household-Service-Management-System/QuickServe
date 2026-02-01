import "./ServiceProviderDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getServiceProviderDetail,
  verifyServiceProvider,
} from "../../api/adminService";

export default function ServiceProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  // ✅ Document labels based on order
  const documentLabels = [
    "Address Proof",
    "Gov ID",
    "Certificate",
  ];

  // ================= FETCH DETAILS =================
  useEffect(() => {
    getServiceProviderDetail(id)
      .then((response) => {
        setProvider(response.data);
        console.log("Service Provider Detail:", response.data);
      })
      .catch((error) => {
        console.error("Service Provider Detail API error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // ================= VERIFY HANDLER =================
  const handleVerify = async () => {
    try {
      setVerifying(true);
      await verifyServiceProvider(id);

      alert("Service Provider verified successfully ✅");

      setProvider((prev) => ({
        ...prev,
        verificationStatus: true,
      }));

      navigate("/admin/pending-requests");
    } catch (error) {
      console.error("Verify error:", error);
      alert("Verification failed ❌");
    } finally {
      setVerifying(false);
    }
  };

  // ================= UI STATES =================
  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Service Provider...</h2>;
  }

  if (!provider) {
    return <h2 style={{ padding: "20px" }}>No Data Found</h2>;
  }

  // ================= UI =================
  return (
    <div className="layout">
      <main className="content">
        <h1 className="page-title">Service Provider Details</h1>

        <div className="detail-card">
          {/* ===== PROFILE IMAGE ===== */}
          <div className="profile-image-section">
            <img
              src={provider.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />
          </div>

          {/* ===== DETAILS ===== */}
          <div className="info-section">
            <p>
              <strong>Name:</strong> {provider.firstName} {provider.lastName}
            </p>
            <p>
              <strong>Email:</strong> {provider.email}
            </p>
            <p>
              <strong>Phone:</strong> {provider.phone}
            </p>
            <p>
              <strong>Address:</strong> {provider.address || "NA"}
            </p>
            

            {/* ===== DOCUMENTS ===== */}
            <div style={{ marginTop: "10px" }}>
              <strong>Documents:</strong>

              {provider.documentUrls && provider.documentUrls.length > 0 ? (
                <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
                  {provider.documentUrls.map((url, index) => (
                    <li key={index}>
                      <strong>
                        {documentLabels[index] || `Document ${index + 1}`}:
                      </strong>{" "}
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ marginTop: "5px" }}>Not Uploaded</p>
              )}
            </div>

            {/* ===== VERIFY BUTTON ===== */}
            {!provider.verificationStatus ? (
              <button
                className="verify-btn"
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying ? "Verifying..." : "Verify Provider"}
              </button>
            ) : (
              <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
                ✔ Verified
              </p>
            )}
          </div>
        </div>

        {/* ===== BACK BUTTON ===== */}
        <div className="back-container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </main>
    </div>
  );
}
