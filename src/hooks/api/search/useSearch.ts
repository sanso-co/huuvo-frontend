import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { LeanShowType } from "@/types/show";
import { apiService } from "@/services/api";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LeanShowType[]>([]);

    const debouncedSearch = useCallback((searchQuery: string) => {
        const search = debounce(async (value: string) => {
            if (value.length > 1) {
                try {
                    const results = await apiService.searchShows(value);
                    setSuggestions(results);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
            }
        }, 300);

        search(searchQuery);
        return () => search.cancel();
    }, []);

    useEffect(() => {
        const cancelSearch = debouncedSearch(query);
        return cancelSearch;
    }, [query, debouncedSearch]);

    return { query, setQuery, suggestions, setSuggestions };
};
