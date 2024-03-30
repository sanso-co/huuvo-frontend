import axios from "axios";

const LOCALURL = "http://localhost:3500";

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
