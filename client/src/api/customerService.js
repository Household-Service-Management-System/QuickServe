import axiosInstance from "./axiosInstance";

export const getAllServiceCategories = async () => {
    const res = await axiosInstance.get("/customer/allServiceCategories");
    return res.data;
};
