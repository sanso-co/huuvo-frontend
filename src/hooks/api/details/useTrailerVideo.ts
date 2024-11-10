import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { TrailerResponseTMDB } from "@/types/showDetail";

export const useTrailerVideo = (id: string) => {
    const [trailer, setTrailer] = useState<TrailerResponseTMDB | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDTrailer = async () => {
            try {
                const result = await apiService.getTrailerVideo(id);
                setTrailer(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDTrailer();
    }, [id]);

    return { trailer, isLoading, error };
};
