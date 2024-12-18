import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { useCategoryStore } from "@/store/categoryStore";
import { useCategory } from "@/hooks/api/category/useCategory";
import { formatName } from "@/helpers/formatName";
import { SortEnum, sortOptions } from "@/helpers/constants/options";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { Spinner } from "@/components/global/Spinner";
import { SEO } from "@/components/global/SEO";

import { CategoryType } from "@/types/category";
import { LeanShowType } from "@/types/show";

import styles from "./category.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { Sort } from "@/features/Category/Sort";
import { SortType } from "@/types/sort";

const Collection = () => {
    const [sort, setSort] = useState<SortType>(SortEnum.DateDesc);
    const { categoryType, categoryName, categoryId } = useParams();
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

        if (!categoryStoreName || categoryStoreName !== categoryName) {
            resetCategory();
            setCategoryStoreName(
                categoryName === "released" ? categoryId || "" : categoryName || ""
            );
            setShows(data.shows.results);
            return;
        }

        if (page > 1) {
            appendShows(data.shows.results);
        }
    }, [
        data,
        categoryStoreName,
        categoryName,
        page,
        resetCategory,
        setCategoryStoreName,
        categoryId,
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

    if (isLoading && page === 1) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO
                title={categoryName || "Collection"}
                description={
                    categoryName ||
                    `Discover ${categoryName || "our collection of"} Korean dramas on K-lama.`
                }
            />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <div className={styles.header}>
                    <Header
                        title={formatName(categoryName || "")}
                        description={
                            categoryType === "provider"
                                ? `Shows streaming on ${formatName(categoryName || "")}`
                                : `Shows with ${categoryType} ${formatName(categoryName || "")}`
                        }
                    />
                </div>
                <div className={styles.sort}>
                    <Sort options={sortOptions} onSortSelect={(option) => setSort(option)} />
                </div>

                <InfiniteScroll
                    dataLength={data?.shows.totalDocs ?? 0}
                    next={loadMore}
                    hasMore={
                        !isLoading &&
                        Boolean(data?.shows.page && data?.shows.page < data?.shows.totalPages)
                    }
                    loader={<Spinner />}
                >
                    <div className={styles.grid}>
                        {shows.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};

export default Collection;
