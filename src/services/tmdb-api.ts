import axios, { AxiosInstance } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
        const TMDB_URL = "https://api.themoviedb.org/3";

        this.api = axios.create({
            baseURL: TMDB_URL,
            params: {
                api_key: TMDB_KEY,
            },
        });
    }

    async getShowDetails(id: string) {
        try {
            const response = await this.api.get(`/tv/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching show details", error);
            throw error;
        }
    }

    async getProviders(id: number) {
        try {
            const response = await this.api.get(`/tv/${id}/watch/providers`);
            return response.data;
        } catch (error) {
            console.error("Error fetching providers", error);
            throw error;
        }
    }

    async getKeywords(id: string) {
        try {
            const response = await this.api.get(`/tv/${id}/keywords`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
            throw error;
        }
    }

    async getTrailerVideo(id: string) {
        try {
            const response = await this.api.get(`/tv/${id}/videos?language=en-US'`);
            return response.data;
        } catch (error) {
            console.error("Error fetching trailer", error);
            throw error;
        }
    }

    async getCredit(id: number) {
        try {
            const response = await this.api.get(`/tv/${id}/aggregate_credits?language=en-US`);
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
            throw error;
        }
    }

    async getCategoryShowList(section: string, id: string, page: number) {
        try {
            const response = await this.api.get(
                `/discover/tv?page=${page}&with_origin_country=KR&${section}=${id}&sort_by=popularity.desc&without_genres=16,10764&with_type=2%7C4`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching shows in the category", error);
            throw error;
        }
    }

    async getPersonShowList(id: string) {
        try {
            const response = await this.api.get(`/person/${id}/tv_credits?language=en-US`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shows by the person", error);
            throw error;
        }
    }

    async getPersonDetails(id: string) {
        try {
            const response = await this.api.get(`/person/${id}?language=en-US`);
            return response.data;
        } catch (error) {
            console.error("Error fetching person details", error);
            throw error;
        }
    }

    async getRecommendations(id: string, page: number) {
        try {
            const response = await this.api.get(`/tv/${id}/recommendations?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching recommendations", error);
            throw error;
        }
    }

    async getSimilar(genres: string, keyword: string) {
        try {
            let url = `/discover/tv?page=1&with_origin_country=KR&with_genres=${genres}&sort_by=vote_count.desc&with_type=2%7C4`;

            if (keyword && keyword.trim() !== "") {
                url += `&with_keywords=${keyword}`;
            }

            const response = await this.api.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching similar shows", error);
            throw error;
        }
    }
}

export const apiService = new ApiService();
