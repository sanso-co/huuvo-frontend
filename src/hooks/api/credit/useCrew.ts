import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { CrewType } from "@/types/credit";

export const useCrew = (id: string) => {
    const [crew, setCrew] = useState<CrewType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCredit(id);
                const filteredResult = result.crew.filter(
                    (crew: CrewType) =>
                        crew.known_for_department === "Directing" ||
                        crew.known_for_department === "Writing"
                );
                setCrew(filteredResult);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { crew, isLoading, error };
};
