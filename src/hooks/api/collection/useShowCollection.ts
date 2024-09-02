import { useState, useEffect, useMemo } from "react";
import { apiService } from "@/services/api";
import { useShowStore } from "@/store/showStore";

export const useShowCollection = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { setCollection, getCollection } = useShowStore();

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const cachedCollection = getCollection(id);
                if (cachedCollection) {
                    setLoading(false);
                    return;
                }

                const result = await apiService.getCollectionList(id);
                setCollection(id, result);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchCollection();
    }, [id, setCollection, getCollection]);

    const collectionData = getCollection(id);

    const latestCollection = useMemo(() => {
        if (collectionData && collectionData.lists.length > 0) {
            return collectionData.lists[collectionData.lists.length - 1];
        }
        return null;
    }, [collectionData]);

    return { loading, error, collectionData, latestCollection };
};
