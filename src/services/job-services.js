import axios from 'axios';

const apiUrl = "https://job-posting-service-1o5j.onrender.com"

export const postJob = (data, token) => axios.post(`${apiUrl}/jobs`, data, { headers: { Authorization: token } });
