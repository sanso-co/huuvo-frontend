import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { ProviderResponse } from "@/types/showDetail";

export const useProviders = (id: string) => {
    const [providers, setProviders] = useState<ProviderResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getProviders(id);
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
