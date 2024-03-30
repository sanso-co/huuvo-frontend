import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StateProps {
  language: string;
  setLanguage: (payload: string) => void;
}

export const useGeneralStore = create<StateProps>()(
  devtools(
    persist(
      (set) => ({
        language: "en",
        setLanguage: (payload: string) => set({ language: payload }),
      }),
      {
        name: "general",
      }
    )
  )
);
