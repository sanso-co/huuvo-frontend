import { create } from "zustand";
import { Provider } from "@/types/provider";

interface ProviderCollections {
    [id: string]: Provider | null;
}

interface ProviderProps {
    providerCollections: ProviderCollections;
    setProviderDetails: (id: string, details: Provider | null) => void;
    isLoading: { [id: string]: boolean };
    setIsLoading: (id: string, loading: boolean) => void;
    errors: { [id: string]: Error | null };
    setError: (id: string, error: Error | null) => void;
}

export const useProviderStore = create<ProviderProps>((set) => ({
    providerCollections: {},
    setProviderDetails: (id, details) =>
        set((state) => ({
            providerCollections: {
                ...state.providerCollections,
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
