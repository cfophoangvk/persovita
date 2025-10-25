import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6789/api/", //https://api.nourivitamin.com/api/
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
