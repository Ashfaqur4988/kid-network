import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "/api",
  // import.meta.env.MODE === "development"
  //   ? "http://localhost:8080/api"
  //   : "/api",
  withCredentials: true,
});
