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

const isValidCollectionId = (key: string): key is keyof typeof collectionId => {
    return key in collectionId;
};

const Collection = () => {
    const { collectionName } = useParams();
    const collectionConstant = convertToConstant(collectionName || "");
    const [page, setPage] = useState(1);
    const [shows, setShows] = useState<Show[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let collectionIdValue = "";
    if (isValidCollectionId(collectionConstant)) {
        collectionIdValue = collectionId[collectionConstant];
    }

    const { permanentCollection, isLoading: collectionLoading } = useGetPermanentDetails(collectionIdValue, page);

    useEffect(() => {
        if (permanentCollection?.shows?.result) {
            setShows((prevShows) => {
                const newShows = permanentCollection.shows.result.filter(
                    (newShow) => !prevShows.some((existingShow) => existingShow.id === newShow.id)
                );
                return [...prevShows, ...newShows];
            });
            setHasMore(permanentCollection.shows.page < permanentCollection.shows.totalPages);
            setIsLoading(false);
        }
    }, [permanentCollection]);

    const fetchMoreData = useCallback(() => {
        if (!collectionLoading && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 800);
        }
    }, [collectionLoading, isLoading]);

    return (
        <div>
            {permanentCollection && <Header title={permanentCollection.name} description={permanentCollection.description ?? ""} />}

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
