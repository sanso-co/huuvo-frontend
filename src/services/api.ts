import { AuthLogin } from "@/types/auth";
import { Cast } from "@/types/cast";
import { Drama } from "@/types/show";
import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });
    }

    //collections
    async getLatestPeriodicCollection(id: string) {
        try {
            const response = await this.api.get(`periodic-collection/${id}/latest`);
            return response.data;
        } catch (error) {
            console.error("Error fetching collection list", error);
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

    async getProviderCollectionDetails(id: string, page: number) {
        try {
            const response = await this.api.get(`provider-collection/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collection details", error);
        }
    }

    //categories
    async getCategoryList(category: string, id: string, page: number) {
        try {
            const response = await this.api.get(`show/list/${category}/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching category list", error);
        }
    }

    //recommendations
    async getRecommendationDetails(showId: number) {
        try {
            const response = await this.api.get(`recommendations/details/${showId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message === "recommendations not found") {
                    return null;
                } else {
                    console.error("Error fetching recommendations:", error);
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    }

    //details
    async getShowDetails(id: number) {
        try {
            const response = await this.api.get(`show/details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching drama details", error);
        }
    }

    //keywords
    async getKeywordsForShow(showId: number) {
        try {
            const response = await this.api.get(`keyword/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
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

    async getKeywordDetails(id: string, page: number) {
        try {
            const response = await this.api.get(`keyword/detail/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords details", error);
        }
    }

    //cast
    async getCastsForShow(showId: number) {
        try {
            const response = await this.api.get(`cast/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    async getPersonDetails(personId: string, page: number) {
        try {
            const response = await this.api.get(`person/${personId}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collection details", error);
        }
    }

    //credits
    async getCreditsForShow(showId: number) {
        try {
            const response = await this.api.get(`credit/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
        }
    }

    async getCreditDetails(id: string, page: number) {
        try {
            const response = await this.api.get(`credit/detail/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords details", error);
        }
    }

    //admin
    async addDrama({ drama }: { drama: Drama }) {
        try {
            const response = await this.api.post("drama", { drama });
            return response.data;
        } catch (error) {
            console.error("Error adding a show", error);
            throw error;
        }
    }

    async addShowToProviderCollection({
        providerId,
        providerName,
        showId,
    }: {
        providerId: number;
        providerName: string;
        showId: number;
    }) {
        try {
            const response = await this.api.patch(`provider-collection/add/${providerId}`, {
                providerName,
                showId,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
            throw error;
        }
    }

    async addCastToShow({ showId, mainCast }: { showId: number; mainCast: Cast[] }) {
        try {
            const response = await this.api.patch(`cast/add/${showId}`, {
                mainCast,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding a show to provider collection", error);
            throw error;
        }
    }

    async login({ email, password }: AuthLogin) {
        try {
            const response = await this.api.post("auth/login", { email, password });
            return response.data;
        } catch (error) {
            console.error("Error loggin in", error);
            throw error;
        }
    }

    async getAllHeroes() {
        try {
            const response = await this.api.get("hero");
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }
}

export const apiService = new ApiService();
