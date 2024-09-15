import { useCallback, useEffect } from "react";
import { apiService } from "@/services/tmdb-api";
import { useCategoryStore } from "@/store/categoryStore";

export const useCategory = (section: string, id: string, page: number) => {
    const {
        categoryCollections,
        isLoading,
        errors,
        setCategoryCollection,
        getCollection,
        setIsLoading,
        setError,
    } = useCategoryStore();

    const getCategoryCollection = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);

        try {
            const fetchedCategory = await apiService.getCategoryShowList(section, id, page);
            setCategoryCollection(id, fetchedCategory);
            return fetchedCategory;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, page, section, setCategoryCollection, setError, setIsLoading]);

    useEffect(() => {
        getCategoryCollection();
    }, [getCategoryCollection]);

    return {
        getCategoryCollection,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        categoryCollection: categoryCollections[id] || null,
    };
};
