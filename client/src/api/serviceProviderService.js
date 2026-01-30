
import axiosInstance from "./axiosInstance";

export const getProviderDashboard = () => {
    return axiosInstance.get("/service-provider/dashboard");
};

export const getUpcomingBookings = (page = 0, size = 3) => {
    return axiosInstance.get("/service-provider/bookings/upcoming", {
        params: { page, size }
    });
};

export const getPopularServices = () => {
    return axiosInstance.get("/service-provider/dashboard/popular-services");
};


// All service requests
export const getServiceRequests = () => {
    return axiosInstance.get("/service-provider/bookings");
};

// Accept booking
export const acceptBooking = (bookingId) => {
    return axiosInstance.patch(
        `/service-provider/bookings/${bookingId}/accept`
    );
};

// Reject booking
export const rejectBooking = (bookingId, reason) => {
    return axiosInstance.patch(
        `/service-provider/bookings/${bookingId}/reject`,
        reason,
        { headers: { "Content-Type": "text/plain" } }
    );
};

// Payments (all)
export const getPayments = () => {
    return axiosInstance.get("/service-provider/payments");
};

// Payments with search + filter
export const searchPayments = (query, filter) => {
    return axiosInstance.get("/service-provider/payments/search", {
        params: {
            query: query || null,
            filter: filter || "All",
        },
    });
};


// Get profile
export const getProviderProfile = () => {
    return axiosInstance.get("/service-provider/profile");
};

// Update profile (multipart)
export const updateProviderProfile = (formData) => {
    return axiosInstance.put("/service-provider/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Documents
export const getDocuments = () => {
    return axiosInstance.get("/service-provider/documents");
};

export const uploadDocument = (formData) => {
    return axiosInstance.post("/service-provider/documents", formData);
};

export const deleteDocument = (docId) => {
    return axiosInstance.delete(`/service-provider/documents/${docId}`);
};

// Provider's own services
export const getProviderServices = () => {
    return axiosInstance.get("/service-provider/services");
};


export const getAllServices = () => {
    return axiosInstance.get("/services");
};

// Add service to provider
export const addServiceToProvider = (serviceId) => {
    return axiosInstance.post(`/service-provider/services/${serviceId}`);
};

// Remove service from provider
export const removeServiceFromProvider = (serviceId) => {
    return axiosInstance.delete(`/service-provider/services/${serviceId}`);
};


// get single service (public)
export const getServiceById = (serviceId) => {
    return axiosInstance.get(`/services/${serviceId}`);
};

// get categories
export const getServiceCategories = () => {
    return axiosInstance.get("/service-categories");
};

// update service
export const updateService = (serviceId, payload) => {
    return axiosInstance.put(`/services/${serviceId}`, payload);
};


//Help and Support - Disputes
export const createDispute = (payload) => {
    return axiosInstance.post("/disputes", payload);
};

export const getMyDisputes = () => {
    return axiosInstance.get("/disputes/my");
};

export const getDisputeById = (id) => {
    return axiosInstance.get(`/disputes/${id}`);
};

export const getNotificationPreference = () => {
    return axiosInstance.get("/settings/notifications");
};

export const updateNotifications = (enabled) => {
    return axiosInstance.put("/settings/notifications", null, {
        params: { enabled }
    });
};
