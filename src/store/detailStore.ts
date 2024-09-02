import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ShowDetail } from "@/types/showDetail";

interface DetailProps {
    currentShow: ShowDetail | null;
    setCurrentShow: (show: ShowDetail) => void;
}

export const useDetailStore = create<DetailProps>()(
    devtools(
        persist(
            (set) => ({
                currentShow: null,
                setCurrentShow: (show) => set({ currentShow: show }),
            }),
            {
                name: "detail",
            }
        )
    )
);
