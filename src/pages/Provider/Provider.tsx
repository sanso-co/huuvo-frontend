import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Drama } from "@/types/show";

import { Header } from "@/components/global/Header";
import { DramaCard } from "@/components/feature/DramaCard";

import styles from "./provider.module.scss";
import { Spinner } from "@/components/global/Spinner";
import { useGetProviderDetails } from "@/hooks/api/collection/useProviderCollection";
import { collectionId } from "@/helpers/constants/collectionId";
import { convertToConstant } from "@/helpers/convertToConstant";
import { useCollectionStore } from "@/store/collectionStore";

const ProviderCollection = () => {
    const { providerName } = useParams();
    const collectionKey = convertToConstant(providerName || "");
    const [localPage, setLocalPage] = useState(1);

    const { page, setPage, shows, setShows, collection, setCollection, resetCollection } =
        useCollectionStore();

    const [isLoading, setIsLoading] = useState(false);

    const collectionIdValue = collectionId[collectionKey as keyof typeof collectionId];

    useEffect(() => {
        if (providerName && providerName !== collection) {
            resetCollection();
            setCollection(providerName);
            setLocalPage(1);
        } else if (!collection && providerName) {
            setCollection(providerName);
        }
    }, [providerName, resetCollection, collection, setCollection, setPage, page]);

    useEffect(() => {
        setLocalPage(page);
    }, [page]);

    const { providerCollection, isLoading: collectionLoading } = useGetProviderDetails(
        collectionIdValue,
        localPage
    );

    useEffect(() => {
        if (providerCollection?.shows?.result) {
            setShows((existingShows) => {
                const newShows = providerCollection?.shows?.result.filter(
                    (newShow) =>
                        !existingShows.some((existingShow) => existingShow.id === newShow.id)
                );
                return [...existingShows, ...newShows];
            });
            setIsLoading(false);
        }
    }, [providerCollection, setShows]);

    const fetchMoreData = useCallback(() => {
        if (!collectionLoading && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 800);
        }
    }, [collectionLoading, isLoading, setPage]);

    return (
        <div>
            {providerCollection && (
                <div className={styles.header}>
                    <Header
                        title={providerCollection.name}
                        description={providerCollection.description ?? ""}
                    />
                </div>
            )}

            {shows && shows.length === 0 ? (
                <div className={styles.container}>Not available yet :(</div>
            ) : (
                <InfiniteScroll
                    dataLength={shows.length}
                    next={fetchMoreData}
                    hasMore={
                        !!providerCollection &&
                        !!providerCollection.shows.page &&
                        !!providerCollection.shows.totalPages &&
                        providerCollection.shows.page < providerCollection.shows.totalPages
                    }
                    loader={<Spinner />}
                    endMessage={
                        <div className={styles.endMessage}>
                            <p>Yay! You have seen it all</p>
                        </div>
                    }
                >
                    <div className={styles.grid}>
                        {shows.map((show: Drama) => (
                            <DramaCard drama={show} key={show.id} />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default ProviderCollection;
