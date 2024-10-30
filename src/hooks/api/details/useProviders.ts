import { useCallback, useEffect, useState } from "react";
import { apiService as tmdbService } from "@/services/tmdb-api";
import { apiService } from "@/services/api";
import { ProviderResponse } from "@/types/showDetail";
import { ProviderItemResponse } from "@/types/provider";

export const useProviders = (id: number) => {
    const [providers, setProviders] = useState<ProviderResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await tmdbService.getProviders(id);
                setProviders(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { providers, isLoading, error };
};

export const useGetProvidersForShow = (showId: number) => {
    const [providers, setProviders] = useState<ProviderItemResponse[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProvidersForShow = useCallback(async () => {
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
