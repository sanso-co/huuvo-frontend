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

// new approach

export const api = axios.create({
  baseURL: LOCALURL,
});

export const getCollectionList = async (type: string) => {
  try {
    const response = await api.get(`collection-group/${type}`);
    return response.data.results.collections;
  } catch (error) {
    console.error("Error fetching collection list", error);
  }
};
