import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://persovita-m2y9.vercel.app/api/",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
