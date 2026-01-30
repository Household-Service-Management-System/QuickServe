import { useEffect, useState } from "react";
import {
  GetCustomerProfile,
  updateCustomerProfile,
} from "../../api/customerService";



export default function CustomerProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    street: "",
    pincode: "",
    gender: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await GetCustomerProfile();
      setProfile(res.data);
      setPreviewImage(res.data.profileImage || "");
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    setProfile({ ...profile, profileImage: imageURL });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      await updateCustomerProfile(profile, null);
      setMessage("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={
                  previewImage ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />

              {editMode && (
                <label className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                My Profile
              </h1>
              <p className="text-sm text-gray-500">
                Personal information & contact details
              </p>
            </div>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* FORM */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} disabled={!editMode} />
            <Input label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} disabled={!editMode} />
            <Input label="Email" name="email" value={profile.email} disabled />
            <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode} />
            <Input label="Gender" name="gender" value={profile.gender} onChange={handleChange} disabled={!editMode} />
            <Input label="City" name="city" value={profile.city} onChange={handleChange} disabled={!editMode} />
            <Input label="State" name="state" value={profile.state} onChange={handleChange} disabled={!editMode} />
            <Input label="Street" name="street" value={profile.street} onChange={handleChange} disabled={!editMode} />
            <Input label="Pincode" name="pincode" value={profile.pincode} onChange={handleChange} disabled={!editMode} />
          </div>

          {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
        </div>

        {/* ACTION BAR */}
        {editMode && (
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
            <button
              onClick={() => {
                setEditMode(false);
                fetchProfile();
              }}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 w-full rounded-lg p-2 border 
          ${disabled ? "bg-gray-100 text-gray-600" : "focus:ring-2 focus:ring-blue-500"}
        `}
      />
    </div>
  );
}
