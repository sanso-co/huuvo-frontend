import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { ResultsResponse } from "@/types/results";

export const useSimilar = (genres: string, keyword: string) => {
    const [similar, setSimilar] = useState<ResultsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getSimilar(genres, keyword);

                setSimilar(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [genres, keyword]);

    return { similar, loading, error };
};
