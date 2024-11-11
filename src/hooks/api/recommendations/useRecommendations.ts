import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { RecommendationsResponse } from "@/types/recommendations";
import { LeanShowType } from "@/types/show";

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

export const useGetSimilar = (showId: number) => {
    const [similar, setSimilar] = useState<LeanShowType[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getSimilar = useCallback(async () => {
        if (!showId) return;
        setIsLoading(true);
        setError(null);
        try {
            const fetchedSimilar = await apiService.getSimilarShows(showId);
            setSimilar(fetchedSimilar);
            return fetchedSimilar;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [showId, setIsLoading, setError]);

    useEffect(() => {
        getSimilar();
    }, [getSimilar]);

    return { refetch: getSimilar, isLoading, error, similar };
};
