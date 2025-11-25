import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api", // <-- BACKEND REAL
  withCredentials: true
});

export default api;
