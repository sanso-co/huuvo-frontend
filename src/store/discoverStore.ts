import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeanShowType } from "@/types/show";
import { FilterType } from "@/types/filter";

interface DiscoverState {
    shows: LeanShowType[];
    page: number;
    totalPages: number;
    cachedFilters: FilterType | null;
    cachedPage: number | null;
    setShows: (shows: LeanShowType[]) => void;
    setPage: (page: number) => void;
    setTotalPages: (totalPages: number) => void;
    setCachedFilters: (filters: FilterType) => void;
    setCachedPage: (page: number) => void;
    resetDiscover: () => void;
}

export const useDiscoverStore = create<DiscoverState>()(
    devtools(
        (set) => ({
            shows: [],
            page: 1,
            totalPages: 0,
            cachedFilters: null,
            cachedPage: null,
            setShows: (shows) => set({ shows }),
            setPage: (page) => set({ page }),
            setTotalPages: (totalPages) => set(() => ({ totalPages })),
            setCachedFilters: (filters) => set(() => ({ cachedFilters: filters })),
            setCachedPage: (page) => set(() => ({ cachedPage: page })),
            resetDiscover: () =>
                set(() => ({
                    shows: [],
                    page: 1,
                    totalPages: 0,
                    cachedFilters: null,
                    cachedPage: null,
                })),
        }),
        {
            name: "discover",
        }
    )
);
