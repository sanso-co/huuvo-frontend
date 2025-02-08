import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeanShowType } from "@/types/show";

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
            resetCollection: () => set({ collection: "", shows: [], page: 1 }),
        }),
        {
            name: "collection",
        }
    )
);
