import { useCallback, useEffect } from "react";
import { apiService } from "@/services/api";
import { useCategoryStore } from "@/store/categoryStore";

export const useCategory = (category: string, id: string, page: number) => {
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
            const fetchedCategory = await apiService.getCategoryList(category, id, page);
            setCategoryCollection(id, fetchedCategory);
            return fetchedCategory;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [category, id, page, setCategoryCollection, setError, setIsLoading]);

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
