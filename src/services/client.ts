import axios from "axios";

const LOCALURL = import.meta.env.VITE_API_URL;

const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const user = storedUser.state?.user;
const TOKEN = user?.token;

export const client = axios.create({
  baseURL: LOCALURL,
});

export const customPrivateClient = axios.create({
  baseURL: LOCALURL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
