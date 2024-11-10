import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { CreditType } from "@/types/showDetail";

export const useCredits = (id: number) => {
    const [credits, setCredits] = useState<CreditType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCreditsForShow(id);
                setCredits(result.results);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { credits, isLoading, error };
};
