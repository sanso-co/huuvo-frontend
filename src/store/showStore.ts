import { create } from "zustand";
import { CollectionResponse, CollectionStore } from "@/types/show";

interface CollectionProps {
    collections: CollectionStore;
    setCollection: (type: string, data: CollectionResponse) => void;
    getCollection: (type: string) => CollectionResponse | null;
}

export const useShowStore = create<CollectionProps>((set, get) => ({
    collections: {},
    setCollection: (type, data) => set((state) => ({ collections: { ...state.collections, [type]: data } })),
    getCollection: (type) => get().collections[type] || null,
}));
