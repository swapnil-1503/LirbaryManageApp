// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const studentToken = localStorage.getItem("studentToken");

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (studentToken) {
    config.headers.Authorization = `Bearer ${studentToken}`;
  }

  return config;
});

export default axiosInstance;
