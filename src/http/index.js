import axios from "axios";
import { FromStorage } from "../library";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



http.interceptors.request.use(
  (config) => {
    // console.log("Hello");
    const token = FromStorage("r130fronttoken");  
    if (token) {
      // console.log(token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


http.interceptors.response.use(
  (response) => {
    // console.log(response);
    if ("message" in response.data) {
      toast.success(response.data.message);
    }
    return response;
    // console.log(response);
  },

  (error) => {
    console.log(error);
    
    if ("message" in error.response.data) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
    // console.log(error);
  }
);

export default http;
