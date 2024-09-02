import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CreditShowListResponse } from "@/types/credit";

interface CreditProps {
    personShowList: CreditShowListResponse | null;
    setPersonShowList: (personShowList: CreditShowListResponse) => void;
}

export const useCreditStore = create<CreditProps>()(
    devtools(
        persist(
            (set) => ({
                personShowList: null,
                setPersonShowList: (personShowList) => set({ personShowList }),
            }),
            {
                name: "personShowList",
            }
        )
    )
);
