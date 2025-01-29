import { LoginResponse } from "@/types/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
    user: LoginResponse | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    setUser: (user: LoginResponse) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<StateProps>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                accessToken: null,
                refreshToken: null,
                isLoading: false,
                setUser: (user) => set({ user }),
                setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
                setIsLoading: (isLoading) => set({ isLoading }),
                logout: () => {
                    set({ user: null, accessToken: null, refreshToken: null });
                },
            }),
            {
                name: "auth",
            }
        )
    )
);
