import axiosInstance from "./axiosInstance";

/* ================= PROFILE ================= */

// Get customer profile
export const GetCustomerProfile = () => {
  return axiosInstance.get("/customer/profile");
};

export const updateCustomerProfile = (profileData, imageFile) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(profileData)], { type: "application/json" })
  );
  if (imageFile) {
    formData.append("image", imageFile);
  }

  return axiosInstance.put("/customer/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ================= BOOKINGS ================= */

export const getCustomerBookings = () => {
  return axiosInstance.get("/customer/bookings");
};

export const getBookingById = (bookingId) => {
  return axiosInstance.get(`/customer/booking/bookingId/${bookingId}`);
};

export const createBooking = (bookingReqDTO) => {
  return axiosInstance.post("/customer/booking", bookingReqDTO);
};

export const changeBookingStatus = (bookingId, status) => {
  return axiosInstance.put(`/customer/booking/${bookingId}/${status}`);
};

/* ================= PAYMENTS ================= */

export const getCustomerPayments = () => {
  return axiosInstance.get("/customer/payments");
};

export const getPaymentById = (paymentId) => {
  return axiosInstance.get(`/customer/payment/${paymentId}`);
};

export const getPaymentByBooking = (bookingId) => {
  return axiosInstance.get(`/customer/paymentByBooking/${bookingId}`);
};

export const addPaymentByBooking = (paymentDTO) => {
  return axiosInstance.post("/customer/paymentAddByBooking", paymentDTO);
};

/* ================= RAZORPAY ================= */

export const createRazorpayOrder = (bookingId, amount) => {
  return axiosInstance.post("/payment/create-order", {
    bookingId,
    amount,
  });
};

/* ================= DISPUTES ================= */

export const getCustomerDisputes = () => {
  return axiosInstance.get("/customer/disputes");
};

export const createDispute = (disputeDTO) => {
  return axiosInstance.post("/customer/DisputeCreate", disputeDTO);
};

export const updateDispute = (disputeId, disputeDTO) => {
  return axiosInstance.put(`/customer/DisputeUpdate/${disputeId}`, disputeDTO);
};

/* ================= CATEGORIES ================= */

export const getAllServiceCategories = () => {
  return axiosInstance.get("/customer/allServiceCategories");
};
