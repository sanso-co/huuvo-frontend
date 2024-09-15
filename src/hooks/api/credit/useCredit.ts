import { useCallback, useEffect } from "react";
import { apiService } from "@/services/tmdb-api";
import { useCreditStore } from "@/store/creditStore";

export const useCredit = (type: string, id: string) => {
    const { creditCollections, isLoading, errors, setCreditCollection, setIsLoading, setError } =
        useCreditStore();

    const getCreditCollection = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);

        try {
            const fetchedResponse = await apiService.getPersonShowList(id);
            setCreditCollection(id, fetchedResponse[type]);
            return fetchedResponse;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, setCreditCollection, setError, setIsLoading, type]);

    useEffect(() => {
        getCreditCollection();
    }, [getCreditCollection]);

    return {
        getCreditCollection,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        creditCollection: creditCollections[id] || null,
    };
};
