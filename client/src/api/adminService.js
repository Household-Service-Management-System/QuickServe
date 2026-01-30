import axiosInstance from "./axiosInstance";

// ✅ Admin Dashboard API
export const getAdminDashboard = () => {
    return axiosInstance.get("/admin/dashboard");
};


/**
 * Get all customer complaints (Admin)
 */
export const getAllComplaints = () => {
  return axiosInstance.get("/admin/complaints");
};

export const getPaymentRecords = () => {
  return axiosInstance.get("/admin/paymentRecords");
};