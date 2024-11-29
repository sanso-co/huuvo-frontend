import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import { GenreType } from "@/types/showDetail";

export const useGetAllGenre = () => {
    const [genreList, setGenreList] = useState<GenreType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllGenres = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedGenre = await apiService.getAllGenres();
            setGenreList(fetchedGenre);
            return fetchedGenre;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setGenreList, setIsLoading, setError]);

    useEffect(() => {
        getAllGenres();
    }, [getAllGenres]);

    return { genreList, refreshGenres: getAllGenres, isLoading, error };
};
