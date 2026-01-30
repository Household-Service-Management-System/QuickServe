import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./AdminProfile.css";
import AdminMenu from "../../components/AdminMenu";

export default function AdminProfile() {

  const [admin, setAdmin] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 2500);
  };

  // 🔹 FETCH PROFILE
  useEffect(() => {
    axiosInstance
      .get("/admin/profile")
      .then((res) => setAdmin(res.data))
      .catch(() => showToast("error", "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 VALIDATION
  const validate = () => {
    const e = {};
    if (!admin.firstName) e.firstName = "First name required";
    if (!admin.lastName) e.lastName = "Last name required";
    if (!/^[6-9]\d{9}$/.test(admin.phone))
      e.phone = "Enter valid phone number";
    if (!admin.city) e.city = "City is required";
    if (!admin.state) e.state = "State is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setAdmin((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // 🔹 SAVE
  const handleSave = () => {
    if (!validate()) {
      showToast("error", "Fix validation errors");
      return;
    }

    setSaving(true);
    axiosInstance
      .put("/admin/profile", admin)
      .then(() => showToast("success", "Profile updated successfully"))
      .catch(() => showToast("error", "Update failed"))
      .finally(() => setSaving(false));
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Profile...</h2>;
  }

  return (
    <div className="layout">

      {/* ✅ Sidebar – EXACTLY like AdminDashboard */}
      <aside className="sidebar">
        <h2 className="logo">QuickServe</h2>
        <p className="panel-text">Admin Panel</p>

        <AdminMenu />

        <Link to="/admin/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 className="page-title">Admin Profile</h1>

        <div className="profile-card">
          <div className="form-grid">

            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={admin.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={admin.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input value={admin.email} disabled />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={admin.phone}
                maxLength="10"
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                value={admin.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                name="state"
                value={admin.state}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="actions">
            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {toast.show && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </main>
    </div>
  );
}
