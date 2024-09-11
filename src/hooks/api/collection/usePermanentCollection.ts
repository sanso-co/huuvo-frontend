import { useCallback, useEffect } from "react";
import { usePermanentStore } from "@/store/permanentStore";
import { apiService } from "@/services/api";

export const useGetPermanentDetails = (id: string) => {
    const { setPermanentDetails, setIsLoading, setError, isLoading, error, permanentCollection } = usePermanentStore();

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getPermanentCollectionDetails({ id, page: 1, limit: 40 });
            setPermanentDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setPermanentDetails, setIsLoading, setError]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return { getPermanentDetails, isLoading, error, permanentCollection };
};
