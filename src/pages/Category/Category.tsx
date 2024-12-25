import InfiniteScroll from "react-infinite-scroll-component";

import { useCategoryData } from "./hook/useCategoryData";
import { sortOptions } from "@/helpers/constants/options";
import { getHeaderDescription, getHeaderTitle } from "@/helpers/getHeader";

import { Sort } from "@/features/Category/Sort";
import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import { Spinner } from "@/components/global/Spinner";
import { SEO } from "@/components/global/SEO";

import { LeanShowType } from "@/types/show";

import styles from "./category.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Collection = () => {
    const {
        data,
        sort,
        setSort,
        shows,
        isLoading,
        error,
        loadMore,
        hasMore,
        totalDocs,
        categoryName,
        categoryType,
        categoryId,
    } = useCategoryData();

    if (isLoading && shows.length === 0) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <SEO
                title={categoryName || "Collection"}
                description={
                    categoryName ||
                    `Discover ${categoryName || "our collection of"} Korean dramas on K-lama.`
                }
            />
            <div className={`${styles.container} ${layout.default} ${layout.max}`}>
                <div className={styles.header}>
                    <Header
                        showProfileImage={categoryType === "cast" || categoryType === "crew"}
                        profileImageUrl={data?.profile_path}
                        title={getHeaderTitle(categoryType || "", data, categoryName, categoryId)}
                        description={getHeaderDescription(
                            categoryType || "",
                            data,
                            categoryName,
                            categoryId
                        )}
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
