import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });
    }

    async getCollectionList(id: string) {
        try {
            const response = await this.api.get(`periodic-collection/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching collection list", error);
        }
    }

    async getKeywordsList() {
        try {
            const response = await this.api.get("keywords");
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords list", error);
        }
    }
}

export const apiService = new ApiService();
