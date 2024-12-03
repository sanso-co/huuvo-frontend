import { useCallback, useEffect } from "react";
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
import layout from "@/assets/styles/layout.module.scss";

const Collection = () => {
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

    const { data, isLoading, error } = useGetPermanentDetails(collectionIdValue, page);

    const updateCollection = useCallback(() => {
        if (!data) return;

        if (!collection || collection !== collectionName) {
            resetCollection();
            setCollection(collectionName || "");
            setShows(data.shows.results);
            return;
        }

        if (page > 1) {
            appendShows(data.shows.results);
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
        if (!isLoading && data?.shows.hasNextPage) {
            const timer = setTimeout(() => {
                setPage(page + 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading, data?.shows.hasNextPage, setPage, page]);

    if (isLoading && page === 1) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO
                title={data?.name || "Collection"}
                description={
                    data?.description ||
                    `Discover ${data?.name || "our collection of"} Korean dramas on K-lama.`
                }
            />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                {data && (
                    <div className={styles.header}>
                        <Header title={data.name} description={data.description ?? ""} />
                    </div>
                )}

                <InfiniteScroll
                    dataLength={shows.length}
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
