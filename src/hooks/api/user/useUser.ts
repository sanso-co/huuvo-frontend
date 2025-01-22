import { useEffect, useState } from "react";
import axios from "axios";

import { apiService } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";
import { ErrorType } from "@/types/error";

export const useUser = (id?: string) => {
    const { user: updatedUser, setUser, setIsLoading } = useAuthStore();
    const [error, setError] = useState<ErrorType | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchDetails = async () => {
            try {
                const response = await apiService.getUser(id);
                setUser(response);
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
        };

        fetchDetails();
    }, [id, setIsLoading, setUser]);

    return { updatedUser, error };
};
