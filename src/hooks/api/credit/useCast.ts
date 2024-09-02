import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { CastType } from "@/types/credit";

export const useCast = (id: string) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCredit(id);
                setCast(result.cast);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { cast, loading, error };
};
