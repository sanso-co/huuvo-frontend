import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { RecommendationsResponse } from "@/types/recommendations";

export const useRecommendations = (id: string, page: number) => {
    const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getRecommendations(id, page);

                setRecommendations(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, page]);

    return { recommendations, loading, error };
};
