import { useCallback, useState } from "react";
import { apiService } from "@/services/api";
import { Drama } from "@/types/show";

export const useAddDrama = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addDrama = useCallback(
        async (drama: Drama) => {
            if (!drama) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addDrama({
                    drama,
                });
                setData(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addDrama, isLoading, error, data };
};
