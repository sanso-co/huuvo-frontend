import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Show } from "@/types/show";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";

import styles from "./list.module.scss";
import { Spinner } from "@/components/global/Spinner";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { collectionId } from "@/helpers/constants/collectionId";
import { convertToConstant } from "@/helpers/convertToConstant";
import { useCollectionStore } from "@/store/collectionStore";

const isValidCollectionId = (key: string): key is keyof typeof collectionId => {
    return key in collectionId;
};

const Collection = () => {
    const { collectionName } = useParams();
    const collectionConstant = convertToConstant(collectionName || "");
    const [localPage, setLocalPage] = useState(1);

    const { page, setPage, shows, setShows, collection, setCollection, resetCollection } =
        useCollectionStore();

    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let collectionIdValue = "";
    if (isValidCollectionId(collectionConstant)) {
        collectionIdValue = collectionId[collectionConstant];
    }

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
            setHasMore(permanentCollection.shows.page < permanentCollection.shows.totalPages);
            setIsLoading(false);
        }
    }, [permanentCollection, setShows]);

    const fetchMoreData = useCallback(() => {
        if (!collectionLoading && !isLoading && hasMore) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 500);
        }
    }, [collectionLoading, isLoading, hasMore, setPage]);

    return (
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
                hasMore={hasMore}
                loader={<Spinner />}
                endMessage={
                    <div className={styles.endMessage}>
                        <p>Yay! You have seen it all</p>
                    </div>
                }
            >
                <div className={styles.grid}>
                    {shows.map((show: Show) => (
                        <Link to={`/details/${show.id}`} key={show.id}>
                            <ShowCard show={show} />
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Collection;
