import { useCallback, useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useDiscoverStore } from "@/store/discoverStore";
import { DiscoverResponseType } from "@/types/discover";
import { FilterType } from "@/types/filter";

export const useDiscover = (page: number, filters: FilterType) => {
    const { setShows, setTotalPages } = useDiscoverStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDiscoverData = useCallback(async () => {
        try {
            const response: DiscoverResponseType = await apiService.discoverShows(
                page,
                filters.keywords?.map((keyword) => keyword._id),
                filters.genre?._id,
                filters.tone?._id
            );
            setShows(response.results);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.error("Failed to fetch discover data:", err);
            setError("Failed to fetch discover data.");
        } finally {
            setIsLoading(false);
        }
    }, [page, filters, setShows, setTotalPages]);

    useEffect(() => {
        fetchDiscoverData();
    }, [fetchDiscoverData]);

    return { isLoading, error };
};
