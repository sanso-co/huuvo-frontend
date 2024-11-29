import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import { ToneType } from "@/types/showDetail";

export const useGetAllTone = () => {
    const [toneList, setToneList] = useState<ToneType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAllTones = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedTones = await apiService.getAllTones();
            setToneList(fetchedTones);
            return fetchedTones;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setToneList, setIsLoading, setError]);

    useEffect(() => {
        getAllTones();
    }, [getAllTones]);

    return { toneList, refreshTones: getAllTones, isLoading, error };
};
