

import "./ServiceProviderDetail.css";
import { Link, useParams, useNavigate } from "react-router-dom";
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

  // ✅ FETCH SERVICE PROVIDER DETAILS (NO CHANGE)
  useEffect(() => {
    getServiceProviderDetail(id)
      .then((response) => {
        setProvider(response.data);
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

  // ✅ VERIFY HANDLER (NO CHANGE IN API)
  const handleVerify = async () => {
    try {
      setVerifying(true);
      await verifyServiceProvider(id);

      alert("Service Provider verified successfully ✅");

      // update UI state only
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

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Service Provider...</h2>;
  }

  if (!provider) {
    return <h2 style={{ padding: "20px" }}>No Data Found</h2>;
  }

  return (
    <div className="layout">
     

      {/* MAIN CONTENT */}
      <main className="content">
        <h1 className="page-title">Service Provider Details</h1>

        <div className="detail-card">
          <div className="info-section">
            <p>
              <strong>Name:</strong> {provider.firstName}{" "}
              {provider.lastName}
            </p>
            <p>
              <strong>Email:</strong> {provider.email}
            </p>
            <p>
              <strong>Phone:</strong> {provider.phone}
            </p>
            <p>
              <strong>Role:</strong> {provider.role}
            </p>
            <p>
              <strong>Address:</strong> {provider.address || "NA"}
            </p>
            <p>
              <strong>Gov ID Type:</strong> {provider.govIdType}
            </p>
            <p>
              <strong>Gov ID:</strong> {provider.govId}
            </p>
            <p>
              <strong>Certification:</strong>{" "}
              {provider.certification || "Not Uploaded"}
            </p>

            {/* ✅ VERIFY SECTION (ONLY LOGIC CHANGE) */}
            {!provider.verificationStatus ? (
              <button
                className="verify-btn"
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying ? "Verifying..." : "Verify Provider"}
              </button>
            ) : (
              <p style={{ color: "green", fontWeight: "bold" }}>
                ✔ Verified
              </p>
            )}
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="back-container">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </main>
    </div>
  );
}
