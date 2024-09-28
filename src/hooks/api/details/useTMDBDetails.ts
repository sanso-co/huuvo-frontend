import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { DetailResponse } from "@/types/showDetail";

export const useTMDBDetails = (id: string) => {
    const [TMDBDetails, setTMDBDetails] = useState<DetailResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiService.getShowDetails(id);
                setTMDBDetails(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { TMDBDetails, isLoading, error };
};
