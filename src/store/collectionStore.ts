import { LeanShowType } from "@/types/show";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
    collection: string;
    shows: LeanShowType[];
    page: number;
    setPage: (page: number) => void;
    setCollection: (collection: string) => void;
    setShows: (shows: LeanShowType[]) => void;
    appendShows: (newShows: LeanShowType[]) => void;
    resetCollection: () => void;
}

export const useCollectionStore = create<StateProps>()(
    devtools(
        persist(
            (set) => ({
                collection: "",
                shows: [],
                page: 1,
                setPage: (page) => set({ page }),
                setCollection: (collection) => set({ collection }),
                setShows: (shows) => set({ shows }),
                appendShows: (newShows) =>
                    set((state) => ({
                        shows: [...state.shows, ...newShows],
                    })),
                resetCollection: () => set({ collection: "", page: 1, shows: [] }),
            }),
            {
                name: "collection",
            }
        )
    )
);
