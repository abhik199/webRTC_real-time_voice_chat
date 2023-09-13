import axios from "axios";
const url = "http://localhost:1200/api";
const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/send-otp", data);
export const verifyOtp = (data) => api.post("/verify-otp", data);
export const activate = (data) => api.post("/activate", data);
export default api;
