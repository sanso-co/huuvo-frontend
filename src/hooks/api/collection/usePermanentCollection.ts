import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SortType } from "@/types/sort";

interface UseGetPermanentDetailsOptions {
    forceLimit?: number;
}

export const useGetPermanentDetails = (
    id: string,
    page: number,
    options: UseGetPermanentDetailsOptions = {},
    sort: SortType = "date_desc"
) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const limit = options.forceLimit ?? (isMobile ? 10 : 30);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return useQuery({
        queryKey: [id, page, limit, sort],
        queryFn: () => apiService.getPermanentCollectionDetails(id, page, limit, sort),
        enabled: !!id,
    });
};
