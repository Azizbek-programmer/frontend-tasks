import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true, // cookie ishlashi uchun
});

// Request interceptor — faqat token bo‘lsa yuborish
request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // tokenni storage-dan olish
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/json";
  return config;
});

export { request };
