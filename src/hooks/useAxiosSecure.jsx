import axios from "axios";
import { getItem, removeItem } from "@/utils/localStorage";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SITE_URL,
});

axiosSecure.interceptors.request.use(
  config => {
    const token = getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("Token expired or invalid. Logging out...");

      removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
