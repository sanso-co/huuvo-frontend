import { useCallback, useEffect } from "react";
import { useProviderStore } from "@/store/providerStore";
import { apiService } from "@/services/api";

export const useGetProviderDetails = (id: string, page: number) => {
    const { setProviderDetails, setIsLoading, setError, isLoading, errors, providerCollections } =
        useProviderStore();

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);
        try {
            const fetchedDetails = await apiService.getProviderCollectionDetails({
                id,
                page,
                limit: 10,
            });
            setProviderDetails(id, fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, setIsLoading, setError, page, setProviderDetails]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return {
        getPermanentDetails,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        providerCollection: providerCollections[id] || null,
    };
};
