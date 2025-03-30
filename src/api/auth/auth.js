import axios from "axios";

const http = (baseUrl) => {
    const http = axios.create({ baseURL: baseUrl });
    http.interceptors.request.use((config) => {
      config.headers.Accept = "application/json";

      return config;
    });
    
    return http;
  }

export default {
    baseURL: 'http://localhost:8000',
    endpoint: '/api',

    login(params){
        return http(this.baseURL).post(`${this.endpoint}/login`, params)
    }
};
