import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeanShowType } from "@/types/show";

interface UserShowProps {
    userShowStatus: string;
    shows: LeanShowType[];
    page: number;
    setPage: (page: number) => void;
    setUserShowStatus: (name: string) => void;
    setShows: (shows: LeanShowType[]) => void;
    appendShows: (newShows: LeanShowType[]) => void;
    resetCategory: () => void;
}

export const useUserShowStore = create<UserShowProps>()(
    devtools(
        (set) => ({
            userShowStatus: "",
            shows: [],
            page: 1,
            setPage: (page) => set({ page }),
            setUserShowStatus: (name) => set({ userShowStatus: name }),
            setShows: (shows) => set({ shows }),
            appendShows: (newShows) =>
                set((state) => ({
                    shows: [...state.shows, ...newShows],
                })),
            resetCategory: () => set({ userShowStatus: "", shows: [], page: 1 }),
        }),
        {
            name: "userShowStatus",
        }
    )
);
