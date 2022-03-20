import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

privateApi.interceptors.request.use((config) => {
  config.headers!["authorization"] = `Bearer ${window.localStorage.getItem(
    "hash_jwt"
  )}`;
  return config;
});
