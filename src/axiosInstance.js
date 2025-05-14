// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ba-you-production.up.railway.app/api", // ✅ No trailing slash
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
