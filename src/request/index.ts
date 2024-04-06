import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000", // 请求的基础地址
  timeout: 1000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // 允许跨域
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

request.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (response.headers.authorization) {
    const token = response.headers.authorization.split(" ")[1];
    localStorage.setItem("token", token);
    request.defaults.headers.Authorization = token;
  }

  return response.data;
});

export default request;
