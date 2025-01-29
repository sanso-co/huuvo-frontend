import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SortType } from "@/types/sort";

export const useGetShow = (page: number, limit: number, sort: SortType) => {
    return useQuery({
        queryKey: [page, limit, sort],
        queryFn: () => apiService.getShow(page, limit, sort),
    });
};
