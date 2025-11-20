import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/api";
import { ACCESS_TOKEN } from "@utils/constants";
import { redirect } from "next/navigation";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      redirect("/login");
    }

    return Promise.reject(error);
  }
);
