import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { CastType } from "@/types/cast";

export const useGetCast = (id: number) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCastsForShow(id);
                setCast(result);
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
