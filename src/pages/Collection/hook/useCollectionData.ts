import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCollectionStore } from "@/store/collectionStore";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";

import { convertToConstant } from "@/helpers/convertToConstant";
import { collectionId } from "@/helpers/constants/collectionId";
import { SortType } from "@/types/sort";
import { SortOrderEnum } from "@/helpers/constants/options";

export const useCollectionData = () => {
    const [sort, setSort] = useState<SortType>(SortOrderEnum.Newest);
    const { collectionName } = useParams();
    const collectionConstant = convertToConstant(collectionName || "");

    const collectionIdValue = collectionId[collectionConstant as keyof typeof collectionId];

    const {
        page,
        shows,
        collection,
        setPage,
        setCollection,
        setShows,
        appendShows,
        resetCollection,
    } = useCollectionStore();

    const { data, isLoading, error } = useGetPermanentDetails(collectionIdValue, page, {}, sort);

    const updateCollection = useCallback(() => {
        if (!data) return;

        if (!collection || collection !== collectionName) {
            resetCollection();
            setCollection(collectionName || "");
            setShows(data.results);
            return;
        }

        if (page > 1) {
            appendShows(data.results);
        }
    }, [
        data,
        collection,
        collectionName,
        page,
        resetCollection,
        setCollection,
        setShows,
        appendShows,
    ]);

    useEffect(() => {
        updateCollection();
    }, [updateCollection]);

    const loadMore = useCallback(() => {
        if (!isLoading && data?.hasNextPage) {
            const timer = setTimeout(() => {
                setPage(page + 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading, data?.hasNextPage, setPage, page]);

    useEffect(() => {
        resetCollection();
        setPage(1);
    }, [sort, setPage, resetCollection]);

    return {
        data,
        shows,
        sort,
        isLoading,
        error,
        loadMore,
        setSort,
    };
};
