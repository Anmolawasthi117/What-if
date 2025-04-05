import axios from "axios";
export const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
