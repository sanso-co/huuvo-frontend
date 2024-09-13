import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Periodic } from "@/types/periodic";

interface PeriodicCollections {
    [key: string]: Periodic | null;
}

interface CollectionProps {
    periodicCollections: PeriodicCollections;
    setPeriodicCollection: (id: string, data: Periodic) => void;
    getCollection: (id: string) => Periodic | null;
    isLoading: { [id: string]: boolean };
    setIsLoading: (id: string, loading: boolean) => void;
    errors: { [id: string]: Error | null };
    setError: (id: string, error: Error | null) => void;
}

export const usePeriodicStore = create<CollectionProps>()(
    devtools(
        (set, get) => ({
            periodicCollections: {},
            setPeriodicCollection: (id, data) =>
                set((state) => ({
                    periodicCollections: { ...state.periodicCollections, [id]: data },
                })),
            getCollection: (id) => get().periodicCollections[id] || null,
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
            name: "periodic",
        }
    )
);
