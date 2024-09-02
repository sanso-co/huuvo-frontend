import { apiService } from "@/services/tmdb-api";
import { useCreditStore } from "@/store/creditStore";
import { useEffect, useState } from "react";

export const useCreditShowList = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { setPersonShowList } = useCreditStore();

    useEffect(() => {
        const fetchShowsByPerson = async () => {
            try {
                const result = await apiService.getPersonShowList(id);
                setPersonShowList(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchShowsByPerson();
    }, [id, setPersonShowList]);

    const creditShowList = useCreditStore((state) => state.personShowList);

    return { creditShowList, loading, error };
};
