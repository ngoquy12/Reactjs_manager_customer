import axios from "axios";

const BASE_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BASE_URL;
