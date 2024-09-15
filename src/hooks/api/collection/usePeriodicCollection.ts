import { useCallback, useEffect, useMemo } from "react";
import { apiService } from "@/services/api";
import { usePeriodicStore } from "@/store/periodicStore";

export const usePeriodicCollection = (id: string) => {
    const { setPeriodicCollection, getCollection, setIsLoading, setError, isLoading, errors } =
        usePeriodicStore();

    const getPeriodicCollection = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);

        try {
            const result = await apiService.getLatestPeriodicCollection(id);
            setPeriodicCollection(id, result);
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, setPeriodicCollection, setError, setIsLoading]);

    useEffect(() => {
        getPeriodicCollection();
    }, [getPeriodicCollection]);

    const collectionData = getCollection(id);
    const latestCollection = useMemo(() => {
        return collectionData?.list;
    }, [collectionData]);

    return { isLoading, errors, latestCollection };
};
