import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { Show } from "@/types/show";

export const useSimilar = (id: number, genres: string, keyword: string) => {
    const [similar, setSimilar] = useState<Show[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const payload = {
                    id,
                    genres,
                    keyword,
                };
                const result = await apiService.getRecommendationShows(payload);

                setSimilar(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id, genres, keyword]);

    return { similar, isLoading, error };
};
