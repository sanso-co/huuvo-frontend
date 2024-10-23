import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { HeroItem } from "@/types/marketing";

export const useGetHeroes = () => {
    const [heroes, setHeroes] = useState<HeroItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const result = await apiService.getAllHeroes();
                setHeroes(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeroes();
    }, [setHeroes]);

    return { heroes, isLoading, error };
};
