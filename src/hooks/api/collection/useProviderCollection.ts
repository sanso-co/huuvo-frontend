import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useCategoryStore } from "@/store/categoryStore";

export const useProvider = (category: string, id: string, page: number) => {
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
            const fetchedProvider = await apiService.getProviderCollectionDetails(id, page);
            setCategoryCollection(id, fetchedProvider);
            return fetchedProvider;
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

export const useAddShowToProviderCollection = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addShowToProvider = useCallback(
        async (providerId: number, providerName: string, showId: number) => {
            if (!providerId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addShowToProviderCollection({
                    providerId,
                    providerName,
                    showId,
                });
                setData(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addShowToProvider, isLoading, error, data };
};
