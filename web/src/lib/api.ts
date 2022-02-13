import axios from "axios";

export const serverUrl = "http://localhost:3333";

export const api = axios.create({
  baseURL: serverUrl,
});
