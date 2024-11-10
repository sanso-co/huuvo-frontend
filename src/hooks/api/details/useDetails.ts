import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { ShowType } from "@/types/show";

export const useDetails = (id: number) => {
    const [details, setDetails] = useState<ShowType>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiService.getShowDetails(id);
                setDetails(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { details, isLoading, error };
};
