import { useCallback, useEffect } from "react";
import { apiService } from "@/services/api";
import { usePeriodicStore } from "@/store/periodicStore";

export const usePeriodicCollection = (collectionId: string, listId: string, sort?: string) => {
    const { setPeriodicCollection, getCollection, setIsLoading, setError, isLoading, errors } =
        usePeriodicStore();

    const getPeriodicCollection = useCallback(async () => {
        if (!collectionId) return;
        setIsLoading(collectionId, true);
        setError(collectionId, null);

        try {
            const result = await apiService.getSubPeriodicCollection({
                collectionId,
                listId,
                sort,
            });
            setPeriodicCollection(collectionId, result);
        } catch (err) {
            setError(
                collectionId,
                err instanceof Error ? err : new Error("An unknown error occurred")
            );
            throw err;
        } finally {
            setIsLoading(collectionId, false);
        }
    }, [collectionId, listId, sort, setPeriodicCollection, setError, setIsLoading]);

    useEffect(() => {
        getPeriodicCollection();
    }, [getPeriodicCollection]);

    const collectionData = getCollection(collectionId);

    return { isLoading, errors, collectionData };
};
