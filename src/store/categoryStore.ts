import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CategoryCollectionResponse } from "@/types/category";

interface CategoryCollections {
    [key: string]: CategoryCollectionResponse | null;
}

interface CategoryProps {
    categoryCollections: CategoryCollections;
    setCategoryCollection: (id: string, data: CategoryCollectionResponse) => void;
    getCollection: (id: string) => CategoryCollectionResponse | null;
    isLoading: { [id: string]: boolean };
    setIsLoading: (id: string, loading: boolean) => void;
    errors: { [id: string]: Error | null };
    setError: (id: string, error: Error | null) => void;
}

export const useCategoryStore = create<CategoryProps>()(
    devtools(
        (set, get) => ({
            categoryCollections: {},
            setCategoryCollection: (id, data) =>
                set((state) => ({
                    categoryCollections: { ...state.categoryCollections, [id]: data },
                })),
            getCollection: (id) => get().categoryCollections[id] || null,
            isLoading: {},
            setIsLoading: (id, loading) =>
                set((state) => ({
                    isLoading: {
                        ...state.isLoading,
                        [id]: loading,
                    },
                })),
            errors: {},
            setError: (id, error) =>
                set((state) => ({
                    errors: {
                        ...state.errors,
                        [id]: error,
                    },
                })),
        }),
        {
            name: "category",
        }
    )
);
