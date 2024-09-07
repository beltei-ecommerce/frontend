import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_ROOT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.isRetryRequest
    ) {
      error.config.isRetryRequest = true;
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
