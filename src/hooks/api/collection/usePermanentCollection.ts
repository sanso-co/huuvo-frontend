import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { Permanent } from "@/types/permanent";

export const useGetPermanentDetails = (id: string, page: number) => {
    const [permanentCollection, setPermanentCollection] = useState<Permanent>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const fetchedDetails = await apiService.getPermanentCollectionDetails({
                id,
                page,
                limit: 10,
            });
            setPermanentCollection(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setIsLoading, setError, page, setPermanentCollection]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return {
        getPermanentDetails,
        isLoading,
        error,
        permanentCollection,
    };
};
