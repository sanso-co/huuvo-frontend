import { create } from "zustand";
import { Permanent } from "@/types/permanent";

interface PermanentProps {
    permanentCollection: Permanent | null;
    setPermanentDetails: (details: Permanent | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: Error | null;
    setError: (error: Error | null) => void;
}

export const usePermanentStore = create<PermanentProps>((set) => ({
    permanentCollection: null,
    setPermanentDetails: (permanentCollection) => set({ permanentCollection }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));
