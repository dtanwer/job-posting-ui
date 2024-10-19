import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL

export const postJob = (data, token) => axios.post(`${apiUrl}/jobs`, data, { headers: { Authorization: token } });
