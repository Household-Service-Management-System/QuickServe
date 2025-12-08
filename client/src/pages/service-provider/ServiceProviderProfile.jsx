
import React, { useState, useRef } from "react";

export default function ServiceProviderProfile() {
  const initialUser = {
    name: "Durgesh",
    email: "user@gmail.com",
    phone: "9876543210",
    city: "Indore",
    state: "Madhya Pradesh",
  };

  const [user, setUser] = useState(initialUser);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const inputRef = useRef(null);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
  };

  const validate = () => {
    const e = {};
    if (!user.name || user.name.trim().length < 2) e.name = "Enter a valid name";
    if (!/^[6-9]\d{9}$/.test(user.phone)) e.phone = "Enter a valid 10-digit phone starting 6-9";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSave = () => {
    if (!validate()) {
      showToast("error", "Please fix validation errors");
      return;
    }
    showToast("success", "Profile saved locally (static)");
  };

  const onAvatarClick = () => inputRef.current?.click();

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUser(initialUser);
    setAvatar(null);
    setErrors({});
    showToast("info", "Form reset");
  };

  return (
    <div className="flex justify-center w-full mt-6 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

        <div className="pb-4 border-b mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">


          <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden shadow-md flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-semibold text-gray-600">
                  {user.name[0]}
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
              className="px-3 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Upload Avatar
            </button>
          </div>


          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">


            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 ${errors.name ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-300"
                  }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>


            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                maxLength={10}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 ${errors.phone ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-300"
                  }`}
              />
              {errors.phone ? (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">10 digits</p>
              )}
            </div>


            <div>
              <label className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={user.state}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>


      {toast.show && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-sm
            ${toast.type === "success" ? "bg-green-600" :
              toast.type === "error" ? "bg-red-600" : "bg-blue-600"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
