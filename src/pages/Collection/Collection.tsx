import InfiniteScroll from "react-infinite-scroll-component";
import { useCollectionData } from "./hook/useCollectionData";

import { Sort } from "@/features/Sort";
import { SEO } from "@/components/global/SEO";
import { Loader } from "@/components/global/Loader";
import { Header } from "@/components/global/Header";
import { ShowCard } from "@/components/feature/ShowCard";
import { Spinner } from "@/components/global/Spinner";

import { sortOptions } from "@/helpers/constants/options";
import { LeanShowType } from "@/types/show";

import styles from "./collection.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Collection = () => {
    const {
        collectionTitle,
        collectionDesc,
        sort,
        setSort,
        shows,
        isLoading,
        error,
        loadMore,
        hasMore,
        totalDocs,
    } = useCollectionData();

    if (isLoading && shows.length === 0)
        return (
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <Loader />
            </div>
        );
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO pageType="collection" name={collectionTitle} dramas={shows.slice(0, 5)} />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <div className={styles.header}>
                    <Header
                        showProfileImage={false}
                        title={collectionTitle}
                        description={collectionDesc}
                    />
                </div>
                <div className={styles.sort}>
                    <Sort
                        options={sortOptions}
                        selected={sort}
                        onSortSelect={(option) => setSort(option)}
                    />
                </div>
                <div className={styles.content}>
                    <InfiniteScroll
                        dataLength={totalDocs}
                        next={loadMore}
                        hasMore={hasMore}
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
