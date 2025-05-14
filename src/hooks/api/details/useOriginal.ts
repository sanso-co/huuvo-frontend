import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { OriginalType } from "@/types/original";

export const useOriginal = (id: number) => {
    const [original, setOriginal] = useState<OriginalType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getOriginalWorkForShow(id);
                setOriginal(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { original, isLoading, error };
};
