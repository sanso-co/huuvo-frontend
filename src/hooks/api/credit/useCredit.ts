import { useCallback, useEffect } from "react";
import { apiService } from "@/services/api";
import { useCategoryStore } from "@/store/categoryStore";

export const useCredit = (_category: string, id: string, page: number) => {
    const {
        categoryCollections,
        isLoading,
        errors,
        setCategoryCollection,
        setIsLoading,
        setError,
        isCacheValid,
        getCollection,
    } = useCategoryStore();

    const getCollectionData = useCallback(async () => {
        if (!id) return;

        if (isCacheValid(id)) {
            return getCollection(id);
        }

        setIsLoading(id, true);
        setError(id, null);

        try {
            const fetchedCreditCollection = await apiService.getCreditDetails(id, page);
            setCategoryCollection(id, fetchedCreditCollection);
            return fetchedCreditCollection;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [getCollection, id, isCacheValid, page, setCategoryCollection, setError, setIsLoading]);

    useEffect(() => {
        getCollectionData();
    }, [getCollectionData]);

    return {
        getCollection: getCollectionData,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        categoryCollection: categoryCollections[id] || null,
    };
};
