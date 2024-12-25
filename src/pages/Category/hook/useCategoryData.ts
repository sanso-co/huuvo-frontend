import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCategoryStore } from "@/store/categoryStore";
import { useCategory } from "@/hooks/api/category/useCategory";

import { SortEnum } from "@/helpers/constants/options";
import { CategoryType } from "@/types/category";
import { SortType } from "@/types/sort";

export const useCategoryData = () => {
    const [sort, setSort] = useState<SortType>(SortEnum.DateDesc);
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
            setShows(data.shows.results);
            return;
        }

        if (page > 1) {
            appendShows(data.shows.results);
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
        if (!isLoading && data?.shows.hasNextPage) {
            const timer = setTimeout(() => {
                setPage(page + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, data?.shows.hasNextPage, setPage, page]);

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
        hasMore:
            !isLoading && Boolean(data?.shows.page && data?.shows.page < data?.shows.totalPages),
        totalDocs: data?.shows.totalDocs ?? 0,
        categoryName,
        categoryType,
        categoryId,
    };
};
