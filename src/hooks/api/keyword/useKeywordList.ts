import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { useKeywordStore } from "@/store/keywordStore";

export const useKeywordList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { setKeywordsList } = useKeywordStore();

    useEffect(() => {
        const fetchKeywordsList = async () => {
            try {
                const result = await apiService.getKeywordsList();
                setKeywordsList(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchKeywordsList();
    }, [setKeywordsList]);

    const keywordsList = useKeywordStore((state) => state.keywordsList);

    return { keywordsList, loading, error };
};
