import { useState, useEffect } from "react";
import { apiService } from "@/services/api";

export const useKeywordList = () => {
    const [keywordsList, setKeywordsList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchKeywordsList = async () => {
            try {
                const result = await apiService.getKeywordsList();
                setKeywordsList(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchKeywordsList();
    }, [setKeywordsList]);

    return { keywordsList, isLoading, error };
};
