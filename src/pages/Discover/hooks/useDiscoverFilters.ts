import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useDiscover } from "@/hooks/api/discover/useDiscover";

import { FilterCategoryType, FilterParamType, FilterType } from "@/types/filter";
import { itemOptions } from "@/helpers/optionHelper";

export const useDiscoverFilters = (
    page: number,
    keywordList: FilterCategoryType[],
    genreList: FilterCategoryType[],
    toneList: FilterCategoryType[],
    setPage: (page: number) => void
) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isFirstRender = useRef(true);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    const [newFilter, setNewFilter] = useState<FilterType>({
        keyword: undefined,
        genre: undefined,
        tone: undefined,
    });
    const { fetchDiscoverData } = useDiscover();

    const getFiltersFromURL = useCallback(() => {
        const filters: FilterParamType = {};
        const parsed = queryString.parse(location.search);

        if (parsed.keyword) filters.keyword = parsed.keyword.toString();
        if (parsed.genre) filters.genre = parsed.genre.toString();
        if (parsed.tone) filters.tone = parsed.tone.toString();

        return filters;
    }, [location.search]);

    useEffect(() => {
        if (!keywordList || !genreList || !toneList) return;

        const thisFilters = getFiltersFromURL();
        fetchDiscoverData(page, thisFilters);

        const updates: Partial<FilterType> = {};
        const fieldsInURL = []; // Dynamically track which fields are in the URL
        const completedFields = new Set(); // Tracks which fields have been updated

        if (thisFilters.keyword) {
            fieldsInURL.push("keyword");
            const keywordIds = thisFilters.keyword.split(",");
            const selectedKeywords = keywordIds.map((id) =>
                keywordList.find((keyword) => keyword._id === id)
            );

            const formattedKeywords = itemOptions(selectedKeywords);

            if (formattedKeywords.length > 0) {
                updates.keyword = formattedKeywords;
                completedFields.add("keyword");
            }
        }

        if (thisFilters.genre) {
            fieldsInURL.push("genre");
            const selectedGenre = genreList.find((genre) => genre._id === thisFilters.genre);
            if (selectedGenre) {
                updates.genre = {
                    name: selectedGenre.name,
                    _id: selectedGenre._id,
                };
                completedFields.add("genre");
            }
        }

        if (thisFilters.tone) {
            fieldsInURL.push("tone");
            const selectedTone = toneList.find((tone) => tone._id === thisFilters.tone);
            if (selectedTone) {
                updates.tone = {
                    name: selectedTone.name,
                    _id: selectedTone._id,
                };
                completedFields.add("tone");
            }
        }

        // Ensure only fields present in the URL are checked for completeness
        if (fieldsInURL.every((field) => completedFields.has(field))) {
            setNewFilter((prev) => ({
                ...prev,
                ...updates,
            }));

            // Mark initial load as complete only when all relevant fields are processed
            Promise.resolve().then(() => {
                setIsInitialLoadComplete(true);
            });
        }
    }, [fetchDiscoverData, getFiltersFromURL, page, keywordList, genreList, toneList]);

    useEffect(() => {
        if (isFirstRender.current) {
            if (isInitialLoadComplete) {
                // Mark the first render complete only after the initial load is complete
                isFirstRender.current = false;
            }
            return;
        }

        if (isInitialLoadComplete) {
            const query = queryString.stringify({
                page,
                keyword: newFilter.keyword?.map((k) => k._id).join(","),
                genre: newFilter.genre?._id,
                tone: newFilter.tone?._id,
            });
            navigate(`?${query}`, { replace: true });
        }
    }, [isInitialLoadComplete, navigate, newFilter, page]);

    const handleFilterChange = useCallback(
        (newFilters: FilterType) => {
            setNewFilter(newFilters);
            setPage(1);
        },
        [setPage]
    );

    const handleRemoveGenre = () => {
        handleFilterChange({ ...newFilter, genre: undefined });
    };

    const handleRemoveTone = () => {
        handleFilterChange({ ...newFilter, tone: undefined });
    };

    const handleRemoveKeyword = useCallback(
        (id: string) => {
            const updatedKeywords = newFilter.keyword?.filter((keyword) => keyword._id !== id);
            handleFilterChange({ ...newFilter, keyword: updatedKeywords });
        },
        [newFilter, handleFilterChange]
    );

    const handleResetFilters = () => {
        setNewFilter({
            keyword: undefined,
            genre: undefined,
            tone: undefined,
        });
        setPage(1);
    };

    return {
        newFilter,
        handleFilterChange,
        handleRemoveGenre,
        handleRemoveTone,
        handleRemoveKeyword,
        handleResetFilters,
    };
};
