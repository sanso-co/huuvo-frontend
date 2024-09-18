import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { CastType } from "@/types/credit";

export const useCast = (id: number) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCredit(id);
                setCast(result.cast);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { cast, isLoading, error };
};
