import axios from "axios";

export const setAxiosDefaults = () => {
  process.env.NODE_ENV === "production"
    ? (axios.defaults.baseURL = "https://example.onrender.com")
    : (axios.defaults.baseURL = "http://localhost:8000");

  axios.defaults.withCredentials = true;
};
