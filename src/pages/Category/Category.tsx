import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { useCategoryData } from "@/hooks/api/useCategoryData";
import { useCategoryCollectionStore } from "@/store/categoryCollectionStore";
import { formatName } from "@/helpers/formatName";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { Spinner } from "@/components/global/Spinner";
import { SEO } from "@/components/global/SEO";

import { CategoryType } from "@/types/category";
import { LeanShowType } from "@/types/show";

import styles from "./category.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Collection = () => {
    const { categoryType, categoryName, categoryId } = useParams();
    const [localPage, setLocalPage] = useState(1);

    const { page, setPage, shows, setShows, collection, setCollection, resetCollection } =
        useCategoryCollectionStore();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (
            (categoryName && categoryName !== collection) ||
            (categoryType === "air" && categoryId !== collection)
        ) {
            resetCollection();
            setCollection(categoryName as string);
            setLocalPage(1);
        } else if (!collection && categoryName) {
            setCollection(categoryName);
        }
    }, [
        categoryName,
        resetCollection,
        collection,
        setCollection,
        setPage,
        page,
        categoryType,
        categoryId,
    ]);

    useEffect(() => {
        setLocalPage(page);
    }, [page]);

    const { categoryCollection, isLoading: collectionLoading } = useCategoryData(
        categoryType as CategoryType,
        categoryId as string,
        localPage
    );

    useEffect(() => {
        if (categoryCollection?.shows?.results) {
            setShows((existingShows) => {
                const newShows = categoryCollection.shows.results.filter(
                    (newShow) =>
                        !existingShows.some((existingShow) => existingShow.id === newShow.id)
                );
                return [...existingShows, ...newShows];
            });

            setIsLoading(false);
        }
    }, [categoryCollection, setShows]);

    const fetchMoreData = useCallback(() => {
        if (!collectionLoading && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 500);
        }
    }, [collectionLoading, isLoading, setPage]);

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

                <InfiniteScroll
                    dataLength={shows.length}
                    next={fetchMoreData}
                    hasMore={
                        !!categoryCollection &&
                        !!categoryCollection.shows &&
                        !!categoryCollection.shows.totalPages &&
                        categoryCollection.shows.page < categoryCollection.shows.totalPages
                    }
                    loader={<Spinner />}
                    endMessage={
                        <div className={styles.endMessage}>
                            <p>Yay! You have seen it all</p>
                        </div>
                    }
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
