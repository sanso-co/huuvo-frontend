import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import { KeywordType } from "@/types/showDetail";

export const useGetAllKeywords = () => {
    const [keywordList, setKeywordList] = useState<KeywordType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllKeywords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedTone = await apiService.getAllKeywords();
            setKeywordList(fetchedTone);
            return fetchedTone;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setKeywordList, setIsLoading, setError]);

    useEffect(() => {
        getAllKeywords();
    }, [getAllKeywords]);

    return { keywordList, refreshKeywords: getAllKeywords, isLoading, error };
};
