import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";

interface UseGetPermanentDetailsOptions {
    forceLimit?: number;
}

export const useGetPermanentDetails = (
    id: string,
    page: number,
    options: UseGetPermanentDetailsOptions = {}
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
        queryKey: ["collection", id, page],
        queryFn: () => apiService.getPermanentCollectionDetails(id, page, limit),
        enabled: !!id,
    });
};
