import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL

export const verifyEmailOtp = (data) => axios.post(`${apiUrl}/otp/verify-email`, data);
export const verifyMobileOtp = (data) => axios.post(`${apiUrl}/otp/verify-phone`, data);