import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  withCredentials: true,
});
