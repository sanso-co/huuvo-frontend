import { create } from "zustand";
import { Permanent } from "@/types/permanent";

interface PermanentCollections {
    [id: string]: Permanent | null;
}

interface PermanentProps {
    permanentCollections: PermanentCollections;
    setPermanentDetails: (id: string, details: Permanent | null) => void;
    isLoading: { [id: string]: boolean };
    setIsLoading: (id: string, loading: boolean) => void;
    errors: { [id: string]: Error | null };
    setError: (id: string, error: Error | null) => void;
}

export const usePermanentStore = create<PermanentProps>((set) => ({
    permanentCollections: {},
    setPermanentDetails: (id, details) =>
        set((state) => ({
            permanentCollections: {
                ...state.permanentCollections,
                [id]: details,
            },
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
}));
