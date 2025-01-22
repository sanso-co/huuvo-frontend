import { useCallback, useEffect, useState } from "react";

import { SortEnum } from "@/helpers/constants/options";
import { SortType } from "@/types/sort";
import { useUserShowStore } from "@/store/userShowStore";
import { IUserShowCategory } from "@/types/userShow";
import { useShowInteractions } from "@/hooks/api/user/useUserShow";
import { useParams } from "react-router-dom";

export const useShowInteractionsData = () => {
    const [sort, setSort] = useState<SortType>(SortEnum.DateDesc);
    const { category } = useParams();

    const {
        page,
        shows,
        userShowStatus,
        setPage,
        setUserShowStatus,
        setShows,
        appendShows,
        resetCategory,
    } = useUserShowStore();

    const { data, isLoading, error } = useShowInteractions(
        category as IUserShowCategory,
        page,
        sort
    );

    const updateCategory = useCallback(() => {
        if (!data) return;

        if (!userShowStatus || userShowStatus !== category) {
            resetCategory();
            setUserShowStatus(category || "");
            setShows(data.results);
            return;
        }

        if (page > 1) {
            appendShows(data.results);
        }
    }, [
        data,
        userShowStatus,
        category,
        page,
        resetCategory,
        setUserShowStatus,
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
    }, [sort, category, resetCategory, setPage]);

    return {
        sort,
        setSort,
        category,
        shows,
        data,
        isLoading,
        error,
        loadMore,
        hasMore: !isLoading && Boolean(data?.page && data?.page < data?.totalPages),
        totalDocs: data?.totalDocs ?? 0,
    };
};
