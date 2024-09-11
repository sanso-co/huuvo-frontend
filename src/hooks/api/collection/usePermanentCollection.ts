import { useCallback, useEffect } from "react";
import { usePermanentStore } from "@/store/permanentStore";
import { apiService } from "@/services/api";

export const useGetPermanentDetails = (id: string, page: number) => {
    const { setPermanentDetails, setIsLoading, setError, isLoading, errors, permanentCollections } = usePermanentStore();

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(id, true);
        setError(id, null);
        try {
            const fetchedDetails = await apiService.getPermanentCollectionDetails({ id, page, limit: 10 });
            setPermanentDetails(id, fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(id, err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(id, false);
        }
    }, [id, setIsLoading, setError, page, setPermanentDetails]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return {
        getPermanentDetails,
        isLoading: isLoading[id] || false,
        error: errors[id] || null,
        permanentCollection: permanentCollections[id] || null,
    };
};
