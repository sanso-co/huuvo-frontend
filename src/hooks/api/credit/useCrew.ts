import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { CrewType } from "@/types/credit";

export const useCrew = (id: string) => {
    const [crew, setCrew] = useState<CrewType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCredit(id);
                const filteredResult = result.crew.filter(
                    (crew: CrewType) =>
                        crew.jobs[0].job === "Director" || crew.jobs[0].job === "Writer" || crew.jobs[0].job === "Screenplay"
                );
                setCrew(filteredResult);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { crew, loading, error };
};
