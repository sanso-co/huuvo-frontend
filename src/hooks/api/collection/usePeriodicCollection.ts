import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";

export const usePeriodicCollection = (collectionId: string, listId: string, sort?: string) => {
    return useQuery({
        queryKey: ["periodicCollection", collectionId, listId, sort],
        queryFn: () =>
            apiService.getSubPeriodicCollection({
                collectionId,
                listId,
                sort,
            }),
        enabled: !!collectionId,
    });
};
