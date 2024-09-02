import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CategoryResponse } from "@/types/category";

interface CategoryProps {
    categoryShowList: CategoryResponse | null;
    setCategoryShowList: (categoryShowList: CategoryResponse) => void;
}

export const useCategoryStore = create<CategoryProps>()(
    devtools(
        persist(
            (set) => ({
                categoryShowList: null,
                setCategoryShowList: (categoryShowList) => set({ categoryShowList }),
            }),
            {
                name: "categoryShowList",
            }
        )
    )
);
