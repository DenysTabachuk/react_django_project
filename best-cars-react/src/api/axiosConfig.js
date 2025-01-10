import axios from "axios";

// Create Axios Instance
const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:8000/", //replace with your BaseURL
  refreshTokenURL: "http://127.0.0.1:8000/token/refresh/",
  headers: {
    "Content-Type": "application/json", // change according header type accordingly
  },
});

//Add Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token"); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add Response Interceptor
// Add response interceptor to update access token using refresh token for secure api call.

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(axiosConfig.refreshTokenURL, {
            refreshToken,
          });
          // don't use axious instance that already configured for refresh token api call
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("access_token", newAccessToken); //set new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
