import type { LoginResponse } from "@/pages/auth/types";
import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({ baseURL: "http://localhost:3000/api/v1" });

request.interceptors.request.use((config) => {
  const token = Cookies.get("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status == 401 && !orginalRequest._retry) {
      orginalRequest._retry = true
      try {
        const response = await axios.post<LoginResponse>(
          "http://localhost:3000/api/v1/admin/refresh"
        )
        const newAccessToken = response.data.data.token
        Cookies.set("token", newAccessToken)

        orginalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return request(orginalRequest)
      } catch (refreshError) {
        
        Cookies.remove("token");
        Cookies.remove("role");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
)



export { request };
