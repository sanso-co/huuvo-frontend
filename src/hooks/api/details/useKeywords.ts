import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { KeywordsResponse } from "@/types/showDetail";

export const useKeywords = (id: string) => {
    const [keywords, setKeywords] = useState<KeywordsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getKeywords(id);
                setKeywords(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { keywords, isLoading, error };
};
