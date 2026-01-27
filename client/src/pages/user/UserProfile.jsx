
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function CustomerProfile() {

  const providerId = 2; // TODO: replace with auth context later

  // ---------------- STATE ----------------
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    dob: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const [avatar, setAvatar] = useState(null);
  const inputRef = useRef(null);

  //toast 
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/customer/profile/{id}`
        );

        setUser({
          ...res.data,
          dob: res.data.dob || "", // required for <input type="date">
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
        showToast("error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  //frontend ke validation 
  const validate = () => {
    const e = {};

    if (!user.firstName || user.firstName.trim().length < 2)
      e.firstName = "Enter a valid first name";

    if (!user.lastName || user.lastName.trim().length < 2)
      e.lastName = "Enter a valid last name";

    if (!/^[6-9]\d{9}$/.test(user.phone))
      e.phone = "Enter a valid 10-digit phone number";

    if (!user.city) e.city = "City is required";
    if (!user.state) e.state = "State is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  //input change 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  //save profile
  const handleSave = async () => {
    if (!validate()) {
      showToast("error", "Please fix validation errors");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/service-provider/profile/${providerId}`,
        user
      );

      showToast("success", "Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      showToast("error", "Failed to update profile");
    }
  };


  const handleReset = () => {
    window.location.reload(); // simplest & safe reset
  };

  //avatar
  const onAvatarClick = () => inputRef.current?.click();

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }


  return (
    <div className="flex justify-center w-full mt-6 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

        <div className="pb-4 border-b mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">
            Update your personal details
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden shadow-md flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold text-gray-600">
                  {user.firstName?.[0] || "U"}
                </span>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />

            <button
              onClick={onAvatarClick}
              className="px-3 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              Upload Avatar
            </button>
          </div>

          {/* FORM */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={user.phone}
                maxLength={10}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">State</label>
              <input
                name="state"
                value={user.state}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input
                name="pincode"
                value={user.pincode}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-lg text-gray-700"
          >
            Reset
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white
                        ${toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
