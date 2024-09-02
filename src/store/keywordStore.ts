import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { KeywordType } from "@/types/keyword";

interface KeywordProps {
    keywordsList: KeywordType[] | null;
    setKeywordsList: (keywords: KeywordType[]) => void;
}

export const useKeywordStore = create<KeywordProps>()(
    devtools(
        persist(
            (set) => ({
                keywordsList: null,
                setKeywordsList: (keywordsList) => set({ keywordsList }),
            }),
            {
                name: "keywordsList",
            }
        )
    )
);
