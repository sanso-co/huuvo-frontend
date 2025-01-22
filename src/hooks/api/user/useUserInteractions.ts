import { useCallback, useState } from "react";

import { apiService } from "@/services/api";
import axios from "axios";
import { ErrorType } from "@/types/error";

export const useUserInteractions = () => {
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);

    const likeShow = useCallback(
        async (showId: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await apiService.markUserLike(showId);
                setResponse(userData);
                return userData;
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.data) {
                    const responseData = err.response.data as ErrorType;
                    setError({
                        status: responseData.status,
                        message: responseData.message,
                    });
                } else {
                    setError({
                        status: "error",
                        message: "An unexpected error occurred",
                    });
                }
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    const bookmarkShow = useCallback(
        async (showId: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await apiService.markUserBookmark(showId);
                setResponse(userData);
                return userData;
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.data) {
                    const responseData = err.response.data as ErrorType;
                    setError({
                        status: responseData.status,
                        message: responseData.message,
                    });
                } else {
                    setError({
                        status: "error",
                        message: "An unexpected error occurred",
                    });
                }
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading, setError]
    );

    return { likeShow, bookmarkShow, response, isLoading, error };
};
