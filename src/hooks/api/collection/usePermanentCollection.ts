import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { PermanentType } from "@/types/permanent";

interface UseGetPermanentDetailsOptions {
    forceLimit?: number;
}

export const useGetPermanentDetails = (
    id: string,
    page: number,
    options: UseGetPermanentDetailsOptions = {}
) => {
    const [permanentCollection, setPermanentCollection] = useState<PermanentType>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getPermanentDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const fetchedDetails = await apiService.getPermanentCollectionDetails({
                id,
                page,
                limit: options.forceLimit ?? (isMobile ? 10 : 30),
            });
            setPermanentCollection(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id, setIsLoading, setError, page, setPermanentCollection, options.forceLimit, isMobile]);

    useEffect(() => {
        getPermanentDetails();
    }, [getPermanentDetails]);

    return {
        getPermanentDetails,
        isLoading,
        error,
        permanentCollection,
        isMobile,
    };
};
