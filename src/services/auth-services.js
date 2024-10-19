import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL
export const signup = (data) => axios.post(`${apiUrl}/auth/signup`, data);