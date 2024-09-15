import { Show } from "@/types/show";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CreditCollections {
    [key: string]: Show[] | null;
}

interface CreditProps {
    creditCollections: CreditCollections;
    setCreditCollection: (id: string, data: Show[]) => void;
    isLoading: { [id: string]: boolean };
    setIsLoading: (id: string, loading: boolean) => void;
    errors: { [id: string]: Error | null };
    setError: (id: string, error: Error | null) => void;
}

export const useCreditStore = create<CreditProps>()(
    devtools(
        persist(
            (set) => ({
                creditCollections: {},
                setCreditCollection: (id, data) =>
                    set((state) => ({
                        creditCollections: { ...state.creditCollections, [id]: data },
                    })),
                isLoading: {},
                setIsLoading: (id, loading) =>
                    set((state) => ({
                        isLoading: {
                            ...state.isLoading,
                            [id]: loading,
                        },
                    })),
                errors: {},
                setError: (id, error) =>
                    set((state) => ({
                        errors: {
                            ...state.errors,
                            [id]: error,
                        },
                    })),
            }),
            {
                name: "credit",
            }
        )
    )
);
