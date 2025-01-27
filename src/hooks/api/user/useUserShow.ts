import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { apiService } from "@/services/api";
import { IUserShowCategory, IUserShowCounts, IUserShowStatus } from "@/types/userShow";
import { SortType } from "@/types/sort";

export const useUserShowRating = (id: string) => {
    const [status, setStatus] = useState<IUserShowStatus>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await apiService.getUserShowStatus(id);

                setStatus(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatus();
    }, [id]);

    return { status, isLoading, error };
};

export const useShowInteractions = (
    categoryType: IUserShowCategory,
    page: number,
    sort: SortType
) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const limit = isMobile ? 10 : 30;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return useQuery({
        queryKey: [categoryType, page, sort],
        queryFn: () => apiService.getUserStatusShows(categoryType, page, limit, sort),
        enabled: !!categoryType,
    });
};

export const useUserShowCounts = () => {
    const [details, setDetails] = useState<IUserShowCounts>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await apiService.getUserShowCounts();
                setDetails(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return { details, isLoading, error };
};
