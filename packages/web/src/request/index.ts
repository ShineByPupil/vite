import axios from "axios";

const request = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // 允许跨域
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

request.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(" ")[1];
      localStorage.setItem("token", token);
      request.defaults.headers.Authorization = "Bearer " + token;
    }

    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    const { response } = error;

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default request;
