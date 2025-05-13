import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://youtube-backened.vercel.app/api",
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
