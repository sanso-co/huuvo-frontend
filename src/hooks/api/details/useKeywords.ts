import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { KeywordType } from "@/types/showDetail";

export const useGetKeywords = (id: number) => {
    const [keywords, setKeywords] = useState<KeywordType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getKeywordsForShow(id);
                setKeywords(result.results);
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
