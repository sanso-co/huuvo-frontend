import { useCallback, useEffect } from "react";
import { apiService } from "@/services/api";
import { useCategoryStore } from "@/store/categoryStore";

export const useKeyword = (_category: string, id: string, page: number) => {
    const {
        categoryCollections,
        isLoading,
        errors,
        setCategoryCollection,
        setIsLoading,
        setError,
    } = useCategoryStore();

    const getCollection = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);

        try {
            const fetchedKeywordCollection = await apiService.getKeywordDetails(id, page);
            setCategoryCollection(id, fetchedKeywordCollection);
            return fetchedKeywordCollection;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, page, setCategoryCollection, setError, setIsLoading]);

    useEffect(() => {
        getCollection();
    }, [getCollection]);

    return {
        getCollection,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        categoryCollection: categoryCollections[id] || null,
    };
};
