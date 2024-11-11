import { AuthLogin } from "@/types/auth";
import { CastType } from "@/types/cast";
import axios, { AxiosInstance, AxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
        });
    }

    //collections
    async getSubPeriodicCollection({
        collectionId,
        listId,
        sort,
    }: {
        collectionId: string;
        listId: string;
        sort?: string;
    }) {
        try {
            let url = `periodic-collection/${collectionId}/sub/${listId}`;

            if (sort) {
                url += `?sort=${sort}`;
            }
            const response = await this.api.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching periodic collection details", error);
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
            const response = await this.api.get(`provider/detail/${id}?page=${page}`);
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

    // SIMILAR SHOWS
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

    async getSimilarShows(showId: number) {
        try {
            const response = await this.api.get(`recommendations/similar/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching similar shows", error);
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

    //providers
    async getProvidersForShow(showId: number) {
        try {
            const response = await this.api.get(`provider/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching providers", error);
        }
    }

    //cast
    async getCastsForShow(showId: number) {
        try {
            const response = await this.api.get(`cast/${showId}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.error(
                            (error.response.data as ErrorResponse).message || "Cast not found"
                        );
                    } else {
                        console.error(
                            (error.response.data as ErrorResponse).message ||
                                "Failed to fetch cast information"
                        );
                    }
                } else {
                    console.error("Failed to connect to the server");
                }
            } else {
                console.error("Error fetching cast", error);
            }
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
    async addCastToShow({ showId, mainCast }: { showId: number; mainCast: CastType[] }) {
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
