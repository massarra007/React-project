import axios from "axios";

const { REACT_APP_API_BACK } = process.env;

const customAxios = axios.create({
  baseURL: REACT_APP_API_BACK,
});

customAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("isamm_token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("isamm_ref_token");
      axios.defaults.headers.common.authorization = `Bearer ${
        refreshToken || ""
      }`;
      const { data } = await axios.post(
        "http://localhost:8080/api/user/refreshtoken"
      );

      localStorage.setItem("isamm_token", data.token);
      return customAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default customAxios;
