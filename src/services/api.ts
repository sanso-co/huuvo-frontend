import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });
    }

    async getLatestPeriodicCollection(id: string) {
        try {
            const response = await this.api.get(`periodic-collection/${id}/latest`);
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

    async getPermanentCollectionDetails(payload: { id: string; page: number; limit: number }) {
        try {
            const response = await this.api.get(
                `permanent-collection/${payload.id}?page=${payload.page}&limit=${payload.limit}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collection details", error);
        }
    }

    async getProviderCollectionDetails(payload: { id: string; page: number }) {
        try {
            const response = await this.api.get(
                `provider-collection/${payload.id}?page=${payload.page}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collection details", error);
        }
    }
}

export const apiService = new ApiService();
