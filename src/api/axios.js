import axios from "axios";

const api = axios.create({
  baseURL: "https://agro-app-backend-4kfh.onrender.com/api",
});

export default api;