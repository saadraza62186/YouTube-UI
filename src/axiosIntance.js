import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "ba-you-production.up.railway.app/api",
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
