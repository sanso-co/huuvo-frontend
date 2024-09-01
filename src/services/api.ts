import axios from "axios";

const LOCALURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: LOCALURL,
});

export const getCollectionList = async (type: string) => {
    try {
        const response = await api.get(`periodic-collection/${type}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching collection list", error);
    }
};
