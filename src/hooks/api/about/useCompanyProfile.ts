import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import { ProfileType } from "@/types/about";

export const useGetProfile = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProfile = await apiService.getProfile();
            setProfile(fetchedProfile);
            return fetchedProfile;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [setProfile, setIsLoading, setError]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return { profile, refreshProfile: getProfile, isLoading, error };
};
