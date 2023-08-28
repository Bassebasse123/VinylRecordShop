import axios from "axios";
import Cookies from "js-cookie";

export const setAxiosDefaults = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "jwt"
  )}`;
  process.env.NODE_ENV === "production"
    ? (axios.defaults.baseURL = "https://vinylrecordshop-be.onrender.com")
    : (axios.defaults.baseURL = "http://localhost:8000");

  axios.defaults.withCredentials = true;
};
