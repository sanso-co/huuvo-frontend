import { apiService } from "@/services/tmdb-api";
import { useCategoryStore } from "@/store/categoryStore";
import { useEffect, useState } from "react";

export const useCategoryShowList = (section: string, id: string, page: number, sort?: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { setCategoryShowList } = useCategoryStore();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCategoryShowList(section, id, page, sort);
                setCategoryShowList(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, page, section, setCategoryShowList, sort]);

    const categoryShowList = useCategoryStore((state) => state.categoryShowList);

    return { categoryShowList, loading, error };
};
