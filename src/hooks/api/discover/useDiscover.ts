import { useCallback, useState } from "react";
import { apiService } from "@/services/api";
import { useDiscoverStore } from "@/store/discoverStore";
import { DiscoverResponseType } from "@/types/discover";
import { FilterParamType } from "@/types/filter";

export const useDiscover = () => {
    const { setShows, setTotalPages } = useDiscoverStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDiscoverData = useCallback(
        async (page: number, filters: FilterParamType) => {
            try {
                const response: DiscoverResponseType = await apiService.discoverShows(
                    page,
                    filters.keyword,
                    filters.genre,
                    filters.tone
                );
                setShows(response.results);
                setTotalPages(response.totalPages);
            } catch (err) {
                console.error("Failed to fetch discover data:", err);
                setError("Failed to fetch discover data.");
            } finally {
                setIsLoading(false);
            }
        },
        [setShows, setTotalPages]
    );

    return { fetchDiscoverData, isLoading, error };
};
