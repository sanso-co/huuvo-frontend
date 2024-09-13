import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Show } from "@/types/show";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { useCategoryShowList } from "@/hooks/api/category/useCategoryShowList";

import styles from "./list.module.scss";
import { Spinner } from "@/components/global/Spinner";

export const Category = () => {
    const { categoryType, categoryName, categoryId } = useParams();
    const [page, setPage] = useState(1);
    const [shows, setShows] = useState<Show[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { categoryShowList, loading, error } = useCategoryShowList(
        categoryType as string,
        categoryId as string,
        page
    );

    useEffect(() => {
        if (categoryShowList?.results) {
            setShows((prevShows) => {
                const newShows = categoryShowList.results.filter(
                    (newShow) => !prevShows.some((existingShow) => existingShow.id === newShow.id)
                );
                return [...prevShows, ...newShows];
            });
            setHasMore(categoryShowList.page < categoryShowList.total_pages);
            setIsLoading(false);
        }
    }, [categoryShowList]);

    const fetchMoreData = useCallback(() => {
        if (!loading && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 800);
        }
    }, [loading, isLoading]);

    //TODO: fetch category details and update header
    //TODO: add filter and sort
    // const [sort, setSort] = useState("first_air_date.desc");

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {categoryName && (
                <Header
                    title={categoryName}
                    description={`Shows with ${categoryType} ${categoryName}`}
                />
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
