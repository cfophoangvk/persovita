import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.nourivitamin.com/api/", //https://api.nourivitamin.com/api/
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
