import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { TrailerResponse } from "@/types/showDetail";

export const useTrailerVideo = (id: string) => {
    const [trailer, setTrailer] = useState<TrailerResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getTrailerVideo(id);
                setTrailer(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { trailer, loading, error };
};
