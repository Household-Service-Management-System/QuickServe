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


export const getPendingRequests = () => {
  return axiosInstance.get("/admin/pendingRequests");
};

export const getServiceProviderDetail = (id) => {
  return axiosInstance.get(`/admin/serviceProviderDetail/${id}`);
};

export const verifyServiceProvider = (id) => {
  return axiosInstance.get(`/admin/verify/${id}`);
};

export const getAllServiceProviders = () => {
  return axiosInstance.get("/admin/service-providers");
};

export const deleteServiceProvider = (id) => {
  return axiosInstance.delete(`/admin/${id}`);
};
