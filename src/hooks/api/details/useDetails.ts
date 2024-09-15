import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { DetailResponse } from "@/types/showDetail";

export const useDetails = (id: string) => {
    const [data, setData] = useState<DetailResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiService.getShowDetails(id);
                setData(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { data, isLoading, error };
};
