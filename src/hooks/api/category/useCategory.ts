import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

import { CategoryCollectionResponse, CategoryType } from "@/types/category";

type ApiService = (
    category: string | undefined,
    id: string,
    page: number
) => Promise<CategoryCollectionResponse>;

export const useCategory = (categoryType: CategoryType, id: string, page: number) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const limit = isMobile ? 10 : 30;

    const fetchMap: Record<CategoryType, ApiService> = {
        genre: () => apiService.getCategoryList(categoryType, id, page, limit),
        year: () => apiService.getCategoryList(categoryType, id, page, limit),
        provider: () => apiService.getProviderCollectionDetails(id, page, limit),
        keyword: () => apiService.getCategoryList(categoryType, id, page, limit),
        cast: () => apiService.getPersonDetails(id, page, limit),
        crew: () => apiService.getCreditDetails(id, page, limit),
    };

    const fetchMethod = fetchMap[categoryType];

    if (!fetchMethod) {
        throw new Error(`Unsupported category type: ${categoryType}`);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return useQuery({
        queryKey: [categoryType, id, page],
        queryFn: () => fetchMethod(categoryType, id, page),
        enabled: !!id,
    });
};
