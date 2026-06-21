/**
 * Este archivo será mi conexión general con el backend
 */
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;