import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ProviderType } from "@/types/provider";

export const useGetProvidersForShow = (showId?: number) => {
    const [providers, setProviders] = useState<ProviderType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProvidersForShow = useCallback(async () => {
        if (showId === undefined) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProviders = await apiService.getProvidersForShow(showId);
            setProviders(fetchedProviders.results);
            return fetchedProviders.results;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [showId]);

    useEffect(() => {
        getProvidersForShow();
    }, [getProvidersForShow]);

    return { providers, refreshProviders: getProvidersForShow, isLoading, error };
};
