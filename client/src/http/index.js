import axios from "axios";
const url = "http://localhost:1200/api";
const api = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/send-otp", data);
export const verifyOtp = (data) => api.post("/verify-otp", data);

export default api;
