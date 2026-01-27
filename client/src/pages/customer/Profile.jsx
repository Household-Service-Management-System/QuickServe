import { useEffect, useState } from "react";
import axios from "axios";

const USER_ID = 4; // TODO: replace with logged-in user id

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
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/customer/profile/${USER_ID}`
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  setSaving(true);
  setMessage("");

  try {
    await axios.put(
      `http://localhost:8080/customer/profile/${USER_ID}`,
      profile
    );

    setMessage("Profile updated successfully");
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
      <div className="max-w-4xl mx-auto bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Manage your personal information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} />
          <Input label="Email" name="email" value={profile.email} onChange={handleChange} disabled />
          <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
          <Input label="Gender" name="gender" value={profile.gender} onChange={handleChange} />
          <Input label="City" name="city" value={profile.city} onChange={handleChange} />
          <Input label="State" name="state" value={profile.state} onChange={handleChange} />
          <Input label="Street" name="street" value={profile.street} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={profile.pincode} onChange={handleChange} />
        </div>

        {message && (
          <p className="mt-4 text-sm text-blue-600">{message}</p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
    </div>
  );
}
