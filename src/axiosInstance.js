// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ba-you-production.up.railway.app/api", // ✅ NO slash at end
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
