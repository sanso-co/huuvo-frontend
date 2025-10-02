import axios, { AxiosInstance, AxiosError } from "axios";

import { useAuthStore } from "@/store/useAuthStore";
import { navigationService } from "./navigation";

import { AuthLogin } from "@/types/auth";
import { SortType } from "@/types/sort";
import { IUserShowCategory } from "@/types/userShow";

interface ErrorResponse {
    message: string;
}

class ApiService {
    private api: AxiosInstance;

    constructor() {
        const LOCALURL = import.meta.env.VITE_API_URL;

        this.api = axios.create({
            baseURL: LOCALURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Refresh token interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                const requiresAuth = originalRequest?.headers?.["requires-auth"] === "true";

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "auth/refresh" &&
                    requiresAuth
                ) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = useAuthStore.getState().refreshToken;

                        if (!refreshToken) {
                            useAuthStore.getState().logout();
                            navigationService.navigate("/login", {
                                state: { from: window.location.pathname },
                            });
                            return Promise.reject(error);
                        }

                        const response = await axios.post(`${LOCALURL}/auth/refresh`, {
                            refreshToken,
                        });
                        const { accessToken, refreshToken: newRefreshToken } = response.data;

                        useAuthStore.getState().setTokens(accessToken, newRefreshToken);
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return this.api(originalRequest);
                    } catch (refreshError) {
                        useAuthStore.getState().logout();
                        navigationService.navigate("/login", {
                            state: { from: window.location.pathname },
                        });
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Attach token interceptor
        this.api.interceptors.request.use(
            (config) => {
                // Don't attach token for refresh requests
                if (config.url === "auth/refresh") {
                    return config;
                }

                if (config.headers?.["requires-auth"] === "true") {
                    const accessToken = useAuthStore.getState().accessToken;
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    private createAuthConfig() {
        return {
            headers: {
                "requires-auth": "true",
            },
        };
    }

    // SEARCH
    async searchShows(query: string) {
        try {
            const response = await this.api.get(`show/search?query=${query}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching search results", error);
        }
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

    async getPermanentCollectionDetails(id: string, page: number, limit: number, sort: SortType) {
        try {
            const response = await this.api.get(
                `permanent-collection/${id}?page=${page}&limit=${limit}&sort=${sort}`
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching permanent collection details", error);
        }
    }

    async getProviderCollectionDetails(id: string, page: number, limit: number, sort: SortType) {
        try {
            const response = await this.api.get(
                `provider/detail/${id}?page=${page}&limit=${limit}&sort=${sort}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching provider collection details", error);
        }
    }

    //categories
    async getCategoryList(
        category: string,
        id: string,
        page: number,
        limit: number,
        sort: SortType
    ) {
        try {
            const response = await this.api.get(
                `show/list/${category}/${id}?page=${page}&limit=${limit}&sort=${sort}`
            );
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

    // ORIGINAL
    async getOriginalWorkForShow(showId: number) {
        try {
            const response = await this.api.get(`original/show/${showId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching original work", error);
        }
    }

    // GENRE
    async getAllGenres() {
        try {
            const response = await this.api.get("genre");
            return response.data;
        } catch (error) {
            console.error("Error fetching genres", error);
        }
    }

    // TONE
    async getAllTones() {
        try {
            const response = await this.api.get("tone");
            return response.data;
        } catch (error) {
            console.error("Error fetching tones", error);
        }
    }

    async submitUserEmotions({ feeling, question }: { feeling: string; question: string }) {
        try {
            const response = await this.api.post("recommend", {
                feeling,
                question,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching tones", error);
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

    async getAllKeywords() {
        try {
            const response = await this.api.get("keyword");
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords", error);
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

    async getPersonDetails(personId: string, page: number, limit: number, sort: SortType) {
        try {
            const response = await this.api.get(
                `person/${personId}?page=${page}&limit=${limit}&sort=${sort}`
            );
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

    async getCreditDetails(id: string, page: number, limit: number, sort: SortType) {
        try {
            const response = await this.api.get(
                `credit/detail/${id}?page=${page}&limit=${limit}&sort=${sort}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching keywords details", error);
        }
    }

    // AUTH
    async login({ username, password }: AuthLogin) {
        try {
            const response = await this.api.post("auth/login", {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            console.error("Error loggin in", error);
            throw error;
        }
    }

    async signup({
        username,
        email,
        password,
    }: {
        username: string;
        email: string;
        password: string;
    }) {
        try {
            const response = await this.api.post("auth/signup", {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error("Error signing up", error);
            throw error;
        }
    }

    async googleLogin(accessToken: string) {
        try {
            const response = await this.api.post(
                "auth/google",
                { token: accessToken },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error during Google authentication", error);
            throw error;
        }
    }

    async completeProfile(username: string, tempToken: string) {
        try {
            const response = await this.api.post(
                "auth/complete-profile",
                {
                    username,
                },
                {
                    headers: {
                        Authorization: `Bearder ${tempToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error loggin in", error);
            throw error;
        }
    }

    async getUser(id: string) {
        try {
            const response = await this.api.get(`user/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
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

    // ABOUT
    async getProfile() {
        try {
            const response = await this.api.get("profile");
            return response.data;
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    }

    // SHOW
    async getShow(page: number, limit: number, sort: SortType) {
        try {
            const response = await this.api.get(`show?page=${page}&limit=${limit}&sort=${sort}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shows", error);
        }
    }

    // DISCOVER
    async discoverShows(page: number, keyword?: string, genre?: string, tone?: string) {
        try {
            const params = new URLSearchParams();

            // Add query parameters conditionally
            params.append("page", page.toString());
            if (keyword) {
                params.append("keyword", keyword);
            }
            if (genre) {
                params.append("genre", genre);
            }
            if (tone) {
                params.append("tone", tone);
            }

            const response = await this.api.get(`show?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shows", error);
        }
    }

    // USER SHOW
    async getUserShowStatus(showId: string) {
        try {
            const accessToken = useAuthStore.getState().accessToken;
            const config = accessToken ? this.createAuthConfig() : undefined;

            const response = await this.api.get(`user-show/status/${showId}`, config);
            return response.data;
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                return {
                    liked: false,
                    bookmarked: false,
                    watched: false,
                };
            }
            throw error;
        }
    }

    async getUserStatusShows(
        category: IUserShowCategory,
        page: number,
        limit: number,
        sort: SortType
    ) {
        try {
            const response = await this.api.get(
                `user-show/category/${category}?page=${page}&limit=${limit}&sort=${sort}`,
                this.createAuthConfig()
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    async getUserShowCounts() {
        try {
            const response = await this.api.get(`user-show/counts`, this.createAuthConfig());
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    async markUserLike(showId: string) {
        try {
            const response = await this.api.post(
                `user-show/liked/${showId}`,
                {},
                this.createAuthConfig()
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    async markUserBookmark(showId: string) {
        try {
            const response = await this.api.post(
                `user-show/bookmarked/${showId}`,
                {},
                this.createAuthConfig()
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }

    async markUserWatched(showId: string) {
        try {
            const response = await this.api.post(
                `user-show/watched/${showId}`,
                {},
                this.createAuthConfig()
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching heroes", error);
        }
    }
}

export const apiService = new ApiService();
