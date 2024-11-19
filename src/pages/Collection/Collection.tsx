import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { LeanShowType } from "@/types/show";

import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { collectionId } from "@/helpers/constants/collectionId";
import { convertToConstant } from "@/helpers/convertToConstant";
import { useCollectionStore } from "@/store/collectionStore";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { SEO } from "@/components/global/SEO";
import { Spinner } from "@/components/global/Spinner";

import styles from "./list.module.scss";

const Collection = () => {
    const { collectionName } = useParams();
    const collectionConstant = convertToConstant(collectionName || "");
    const collectionIdValue = collectionId[collectionConstant as keyof typeof collectionId];
    const [localPage, setLocalPage] = useState(1);

    const { page, setPage, shows, setShows, collection, setCollection, resetCollection } =
        useCollectionStore();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (collectionName && collectionName !== collection) {
            resetCollection();
            setCollection(collectionName);
            setLocalPage(1);
        } else if (!collection && collectionName) {
            setCollection(collectionName);
        }
    }, [collectionName, resetCollection, collection, setCollection, setPage, page]);

    useEffect(() => {
        setLocalPage(page);
    }, [page]);

    const { permanentCollection, isLoading: collectionLoading } = useGetPermanentDetails(
        collectionIdValue,
        localPage
    );

    useEffect(() => {
        if (permanentCollection?.shows?.result) {
            setShows((existingShows) => {
                const newShows = permanentCollection.shows.result.filter(
                    (newShow) =>
                        !existingShows.some((existingShow) => existingShow.id === newShow.id)
                );
                return [...existingShows, ...newShows];
            });
            setIsLoading(false);
        }
    }, [permanentCollection, setShows]);

    const fetchMoreData = useCallback(() => {
        if (!collectionLoading && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 300);
        }
    }, [collectionLoading, isLoading, setPage]);

    return (
        <>
            <SEO
                title={permanentCollection?.name || "Collection"}
                description={
                    permanentCollection?.description ||
                    `Discover ${
                        permanentCollection?.name || "our collection of"
                    } Korean dramas on K-lama.`
                }
            />
            <div>
                {permanentCollection && (
                    <div className={styles.header}>
                        <Header
                            title={permanentCollection.name}
                            description={permanentCollection.description ?? ""}
                        />
                    </div>
                )}

                <InfiniteScroll
                    dataLength={shows.length}
                    next={fetchMoreData}
                    hasMore={
                        !!permanentCollection?.shows &&
                        !!permanentCollection?.shows.page &&
                        !!permanentCollection?.shows.totalPages &&
                        permanentCollection.shows.page < permanentCollection.shows.totalPages
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
