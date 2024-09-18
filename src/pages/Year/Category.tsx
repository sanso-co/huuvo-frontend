import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Show } from "@/types/show";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";

import { Spinner } from "@/components/global/Spinner";
import { useCategory } from "@/hooks/api/category/useCategory";
import { useCollectionStore } from "@/store/collectionStore";

import styles from "./category.module.scss";

const Collection = () => {
    const { categoryType, categoryName, categoryId } = useParams();
    const [localPage, setLocalPage] = useState(1);

    const { page, setPage, shows, setShows, collection, setCollection, resetCollection } =
        useCollectionStore();

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
        categoryType,
        resetCollection,
        collection,
        setCollection,
        setPage,
        page,
        categoryId,
    ]);

    useEffect(() => {
        setLocalPage(page);
    }, [page]);

    const updatedCategoryType =
        categoryType === "keyword"
            ? "with_keyword"
            : categoryType === "genre"
            ? "with_genre"
            : categoryType === "air"
            ? "first_air_date_year"
            : categoryType;

    const { categoryCollection, isLoading: collectionLoading } = useCategory(
        updatedCategoryType as string,
        categoryId as string,
        localPage
    );

    useEffect(() => {
        if (categoryCollection?.results) {
            setShows((existingShows) => {
                const newShows = categoryCollection.results.filter(
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
        <div>
            <div className={styles.header}>
                <Header
                    title={categoryName || ""}
                    description={`Shows with ${categoryType} ${categoryName}`}
                />
            </div>

            <InfiniteScroll
                dataLength={shows.length}
                next={fetchMoreData}
                hasMore={
                    !!categoryCollection &&
                    !!categoryCollection.page &&
                    !!categoryCollection.total_pages &&
                    categoryCollection.page < categoryCollection.total_pages
                }
                loader={<Spinner />}
                endMessage={
                    <div className={styles.endMessage}>
                        <p>Yay! You have seen it all</p>
                    </div>
                }
            >
                <div className={styles.grid}>
                    {shows.map((show: Show) => (
                        <ShowCard show={show} key={show.id} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Collection;
