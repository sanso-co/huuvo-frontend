import InfiniteScroll from "react-infinite-scroll-component";

import { useShowInteractionsData } from "./hook/useShowInteractionsData";
import { sortOptions } from "@/helpers/constants/options";

import { Loader } from "@/components/global/Loader";
import { Sort } from "@/features/Category/Sort";
import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { Spinner } from "@/components/global/Spinner";
import { SEO } from "@/components/global/SEO";

import { LeanShowType } from "@/types/show";

import styles from "./status.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Status = () => {
    const { sort, setSort, shows, isLoading, error, loadMore, hasMore, totalDocs, category } =
        useShowInteractionsData();

    if (isLoading && shows.length === 0)
        return (
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <Loader />
            </div>
        );
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO
                title={category || "Show Interactions"}
                description={`User ${category || "interacted"} Korean dramas on K-lama.`}
            />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <div className={styles.header}>
                    <Header
                        showProfileImage={false}
                        title={`${category} Shows`}
                        description={`List of shows user marked ${category}`}
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

export default Status;
