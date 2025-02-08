import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { useCollectionStore } from "@/store/collectionStore";

import { SortOrderEnum } from "@/helpers/constants/options";
import { convertToConstant } from "@/helpers/convertToConstant";
import { collectionId } from "@/helpers/constants/collectionId";
import { SortType } from "@/types/sort";

export const useCollectionData = () => {
    const { collectionName } = useParams();
    const collectionConstant = convertToConstant(collectionName || "");
    const collectionIdValue = collectionId[collectionConstant as keyof typeof collectionId];
    const [collectionTitle, setCollectionTitle] = useState("");
    const [collectionDesc, setCollectionDescription] = useState("");
    const [sort, setSort] = useState<SortType>(SortOrderEnum.Newest);

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
            setCollectionTitle(data.name);
            setCollectionDescription(data.description);
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
    }, [sort, resetCollection, setPage]);

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
        collectionTitle,
        collectionDesc,
    };
};
