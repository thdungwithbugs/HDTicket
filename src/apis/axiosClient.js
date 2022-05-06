import axios from "axios";
import qs from "query-string";
import store from "../store";

// Setup những cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjEiLCJIZXRIYW5TdHJpbmciOiIwMy8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzAwMjU2MDAwMDAiLCJuYmYiOjE2NTI4MDY4MDAsImV4cCI6MTY3MDE3MzIwMH0.1kr5Jl5NBazaGYRkUp63Lb6EM9Cpqo0k9yOq8hZnZl4",
  },
  // Override lại cách axios set params lên url
  paramsSerializer: (params) => {
    return qs.stringify(params, { skipEmptyString: true, skipNull: true });
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    const { accessToken } = auth?.user || {};
    // console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor là một khái niệm "can thiệp vào một cái gì đó trong quá trình đến được đích đến của nó"
axiosClient.interceptors.response.use(
  (response) => {
    // interceptors sẽ nhận được response và có thể thay đổi nó trước khi trả ra cho nơi gọi axios

    // response.data là format của axios, sau đó .content là format của Cybersoft
    return response.data.content;
  },
  (error) => {
    // interceptors sẽ nhận được error và có thể thay đổi nó trước khi trả ra cho nơi gọi axios
    // Thêm Promise.reject để đảm bảo sẽ nhảy xuống catch tại nơi gọi axios
    return Promise.reject(error.response.data.content);
  }
);

export default axiosClient;
