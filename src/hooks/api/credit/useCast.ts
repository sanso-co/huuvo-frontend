import { useCallback, useEffect, useState } from "react";
import { apiService as TMDBService } from "@/services/tmdb-api";
import { apiService } from "@/services/api";
import { CastType } from "@/types/credit";
import { Cast } from "@/types/cast";

export const useCast = (id: number) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await TMDBService.getCredit(id);
                setCast(result.cast);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { cast, isLoading, error };
};

export const useGetCast = (id: number) => {
    const [cast, setCast] = useState<CastType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await apiService.getCastsForShow(id);
                setCast(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    return { cast, isLoading, error };
};

export const useAddCastToShow = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const addCastToShow = useCallback(
        async (showId: number, mainCast: Cast[]) => {
            if (!showId) return;
            setIsLoading(true);
            setError(null);
            try {
                const updatedCollection = await apiService.addCastToShow({
                    showId,
                    mainCast,
                });
                setData(updatedCollection);
                return updatedCollection;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { addCastToShow, isLoading, error, data };
};
