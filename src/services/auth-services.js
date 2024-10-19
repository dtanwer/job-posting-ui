import axios from "axios";
const apiUrl = "https://job-posting-service-1o5j.onrender.com"
export const signup = (data) => axios.post(`${apiUrl}/auth/signup`, data);