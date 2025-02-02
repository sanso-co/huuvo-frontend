import InfiniteScroll from "react-infinite-scroll-component";

import { useCollectionData } from "./hook/useCollectionData";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { SEO } from "@/components/global/SEO";
import { Spinner } from "@/components/global/Spinner";

import { LeanShowType } from "@/types/show";

import styles from "./collection.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { Sort } from "@/features/Category/Sort";
import { sortOptions } from "@/helpers/constants/options";

const Collection = () => {
    const { data, sort, isLoading, shows, error, loadMore, setSort } = useCollectionData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO pageType="collection" name={data.name ?? ""} dramas={shows.slice(0, 5)} />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                {data && (
                    <div className={styles.header}>
                        <Header
                            showProfileImage={false}
                            title={data.name}
                            description={data.description ?? ""}
                        />
                    </div>
                )}
                <div className={styles.sort}>
                    <Sort
                        options={sortOptions}
                        selected={sort}
                        onSortSelect={(option) => setSort(option)}
                    />
                </div>
                <div className={styles.content}>
                    <InfiniteScroll
                        dataLength={shows.length}
                        next={loadMore}
                        hasMore={!isLoading && Boolean(data?.page && data?.page < data?.totalPages)}
                        loader={<Spinner />}
                    >
                        <div className={styles.grid}>
                            {shows.map((show: LeanShowType) => (
                                <ShowCard show={show} key={show.id} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default Collection;
