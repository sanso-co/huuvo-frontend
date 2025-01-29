import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCategoryStore } from "@/store/categoryStore";
import { useCategory } from "@/hooks/api/category/useCategory";

import { SortOrderEnum } from "@/helpers/constants/options";
import { CategoryType } from "@/types/category";
import { SortType } from "@/types/sort";

export const useCategoryData = () => {
    const [sort, setSort] = useState<SortType>(SortOrderEnum.Newest);
    const { categoryType, categoryName, categoryId } = useParams();

    const getStoreKey = useCallback(() => {
        return categoryName === "released" ? categoryId || "" : categoryName || "";
    }, [categoryName, categoryId]);

    const {
        page,
        shows,
        categoryStoreName,
        setPage,
        setCategoryStoreName,
        setShows,
        appendShows,
        resetCategory,
    } = useCategoryStore();

    const { data, isLoading, error } = useCategory(
        categoryType as CategoryType,
        categoryId as string,
        page,
        sort
    );

    const updateCategory = useCallback(() => {
        if (!data) return;

        const storeKey = getStoreKey();

        if (!categoryStoreName || categoryStoreName !== storeKey) {
            resetCategory();
            setCategoryStoreName(storeKey);
            setShows(data.results);
            return;
        }

        if (page > 1) {
            appendShows(data.results);
        }
    }, [
        data,
        categoryStoreName,
        getStoreKey,
        page,
        resetCategory,
        setCategoryStoreName,
        setShows,
        appendShows,
    ]);

    useEffect(() => {
        updateCategory();
    }, [updateCategory]);

    const loadMore = useCallback(() => {
        if (!isLoading && data?.hasNextPage) {
            const timer = setTimeout(() => {
                setPage(page + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, data?.hasNextPage, setPage, page]);

    useEffect(() => {
        resetCategory();
        setPage(1);
    }, [sort, resetCategory, setPage]);

    return {
        sort,
        setSort,
        shows,
        data,
        isLoading,
        error,
        loadMore,
        hasMore: !isLoading && Boolean(data?.page && data?.page < data?.totalPages),
        totalDocs: data?.totalDocs ?? 0,
        categoryName,
        categoryType,
        categoryId,
    };
};
