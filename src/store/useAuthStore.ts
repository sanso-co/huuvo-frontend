import { LoginResponse } from "@/types/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
    user: LoginResponse | null;
    isLoading: boolean;
    setUser: (user: LoginResponse) => void;
    setIsLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<StateProps>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isLoading: false,
                setUser: (user) => set({ user }),
                setIsLoading: (isLoading) => set({ isLoading }),
                logout: () => {
                    set({ user: null });
                },
            }),
            {
                name: "auth",
            }
        )
    )
);
