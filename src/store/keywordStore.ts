import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CustomKeywordType } from "@/types/keyword";

interface KeywordProps {
    keywordsList: CustomKeywordType[] | null;
    setKeywordsList: (keywords: CustomKeywordType[]) => void;
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
