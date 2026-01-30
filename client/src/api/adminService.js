import axiosInstance from "./axiosInstance";

// ✅ Admin Dashboard API
export const getAdminDashboard = () => {
    return axiosInstance.get("/admin/dashboard");
};
