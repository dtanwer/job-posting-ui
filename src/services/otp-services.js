import axios from "axios";
const apiUrl = "https://job-posting-service-1o5j.onrender.com"

export const verifyEmailOtp = (data) => axios.post(`${apiUrl}/otp/verify-email`, data);
export const verifyMobileOtp = (data) => axios.post(`${apiUrl}/otp/verify-phone`, data);