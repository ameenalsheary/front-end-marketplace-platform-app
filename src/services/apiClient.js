import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send cookies with every request
  headers: { "Content-Type": "application/json" },
});

// optional: handle global errors
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized. Token may be expired.");
      // you can trigger logout or silent refresh here
    }
    return Promise.reject(err);
  }
);

export default apiClient;
