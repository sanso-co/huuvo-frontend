import { apiService } from "@/services/tmdb-api";
import { useDetailStore } from "@/store/detailStore";
import { useEffect, useState } from "react";

export const useDetails = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { setCurrentShow } = useDetailStore();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getShowDetails(id);
                setCurrentShow(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, setCurrentShow]);

    const currentShow = useDetailStore((state) => state.currentShow);

    return { currentShow, loading, error };
};
