import { useEffect, useState } from "react";
import { apiService } from "@/services/tmdb-api";
import { PersonType } from "@/types/credit";

export const usePersonDetails = (id: string) => {
    const [person, setPerson] = useState<PersonType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getPersonDetails(id);
                setPerson(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { person, loading, error };
};
