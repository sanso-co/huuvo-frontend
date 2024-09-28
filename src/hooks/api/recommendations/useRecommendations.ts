import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { RecommendationsResponse } from "@/types/recommendations";

export const useGetsRecommendations = (showId: number) => {
    const [details, setDetails] = useState<RecommendationsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getRecommendationDetails = useCallback(async () => {
        if (!showId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedDetails = await apiService.getRecommendationDetails(showId);
            setDetails(fetchedDetails);
            return fetchedDetails;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [showId, setIsLoading, setError]);

    useEffect(() => {
        getRecommendationDetails();
    }, [getRecommendationDetails]);

    return { refetch: getRecommendationDetails, isLoading, error, details };
};
