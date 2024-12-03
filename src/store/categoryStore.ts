import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeanShowType } from "@/types/show";

interface CategoryProps {
    categoryStoreName: string;
    shows: LeanShowType[];
    page: number;
    setPage: (page: number) => void;
    setCategoryStoreName: (name: string) => void;
    setShows: (shows: LeanShowType[]) => void;
    appendShows: (newShows: LeanShowType[]) => void;
    resetCategory: () => void;
}

export const useCategoryStore = create<CategoryProps>()(
    devtools(
        (set) => ({
            categoryStoreName: "",
            shows: [],
            page: 1,
            setPage: (page) => set({ page }),
            setCategoryStoreName: (name) => set({ categoryStoreName: name }),
            setShows: (shows) => set({ shows }),
            appendShows: (newShows) =>
                set((state) => ({
                    shows: [...state.shows, ...newShows],
                })),
            resetCategory: () => set({ categoryStoreName: "", shows: [], page: 1 }),
        }),
        {
            name: "category",
        }
    )
);
