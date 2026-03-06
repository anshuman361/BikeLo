import axios from "axios";

const instance = axios.create({
  baseURL: "https://bike-l0.vercel.app/api",
  withCredentials: true,
});

export default instance;
