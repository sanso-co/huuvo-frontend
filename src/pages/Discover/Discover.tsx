import { useDiscoverStore } from "@/store/discoverStore";
import { useDiscoverFilters } from "./hooks/useDiscoverFilters";
import { useGetAllKeywords } from "@/hooks/api/keyword/useKeywordList";
import { useGetAllGenre } from "@/hooks/api/genre/useGenre";
import { useGetAllTone } from "@/hooks/api/tone/useTone";
import { itemOptions } from "@/helpers/optionHelper";

import { Filter } from "@/features/Discover/Filter";
import { RemovableChip } from "@/components/global/RemovableChip";
import { ShowCard } from "@/components/feature/ShowCard";
import { Pagination } from "@/components/global/Pagination";

import layout from "@/assets/styles/layout.module.scss";
import styles from "./discover.module.scss";
import { Header } from "@/components/global/Header";

const Discover = () => {
    const { shows, page, totalPages, setPage } = useDiscoverStore();
    const { keywordList } = useGetAllKeywords();
    const { genreList } = useGetAllGenre();
    const { toneList } = useGetAllTone();

    const {
        newFilter,
        handleFilterChange,
        handleRemoveGenre,
        handleRemoveTone,
        handleRemoveKeyword,
        handleResetFilters,
    } = useDiscoverFilters(page, keywordList, genreList, toneList, setPage);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div className={styles.header}>
                <Header
                    showProfileImage={false}
                    title="Discover Dramas"
                    description="Explore a curated selection of Korean dramas to match your unique preferences. You can filter dramas by genre, tone, and keywords. Whether you’re searching for your next binge-worthy series or looking to explore new themes, this page makes it easy to find dramas that resonate with your mood and interests."
                />
            </div>
            <div className={styles.main}>
                <div className={styles.filter}>
                    <Filter
                        keywordOptions={itemOptions(keywordList)}
                        genreOptions={itemOptions(genreList)}
                        toneOptions={itemOptions(toneList)}
                        selectedKeywords={newFilter.keyword}
                        selectedGenre={newFilter.genre}
                        selectedTone={newFilter.tone}
                        onFilterChange={handleFilterChange}
                        onReset={handleResetFilters}
                    />
                </div>
                <div className={styles.results}>
                    {(newFilter.genre || newFilter.tone || newFilter.keyword) && (
                        <div className={styles.selectedChips}>
                            {newFilter.genre && (
                                <RemovableChip
                                    label={newFilter.genre.name}
                                    onRemove={handleRemoveGenre}
                                />
                            )}
                            {newFilter.tone && (
                                <RemovableChip
                                    label={newFilter.tone.name}
                                    onRemove={handleRemoveTone}
                                />
                            )}
                            {newFilter.keyword?.map((item) => (
                                <RemovableChip
                                    key={item._id}
                                    label={item.name}
                                    onRemove={() => handleRemoveKeyword(item._id)}
                                />
                            ))}
                        </div>
                    )}
                    {shows.length > 0 && (
                        <>
                            <div className={styles.grid}>
                                {shows.map((show) => (
                                    <ShowCard show={show} key={show.id} />
                                ))}
                            </div>
                            <div className={styles.pagination}>
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discover;
