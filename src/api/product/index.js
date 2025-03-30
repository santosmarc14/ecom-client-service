import axios from "axios";

export default {
  http(baseUrl) {
    const http = axios.create({ baseURL: baseUrl });
    http.interceptors.request.use((config) => {
      const token = "";

      config.headers.Accept = "application/json";
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
    
    return http;
  },
};
