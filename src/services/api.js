import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://geobackend-production.up.railway.app/',
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const uploadFile = (fileData, token) => API.post('/geo/upload', fileData, { headers: { Authorization: `Bearer ${token}` } });
export const getGeoData = (token) => API.get('/geodata', { headers: { Authorization: `Bearer ${token}` } });
