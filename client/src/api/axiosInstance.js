import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://13.60.193.121:8080" || "http://localhost:8080",
    withCredentials: true, // safe to keep
});

// 🔐 Attach JWT automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // console.log("Final Headers:", config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
