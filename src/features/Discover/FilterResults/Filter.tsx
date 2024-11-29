import { ShowCard } from "@/components/feature/ShowCard";
import { Pagination } from "@/components/global/Pagination";
import { RemovableChip } from "@/components/global/RemovableChip";
import { FilterType } from "@/types/filter";
import styles from "./results.module.scss";

interface Props {
    isLoading: boolean;
    error: string | null;
    shows: any[];
    filters: FilterType;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onRemoveKeyword: (id: string) => void;
    onRemoveGenre: () => void;
    onRemoveTone: () => void;
}

export const DiscoverResults = ({
    isLoading,
    error,
    shows,
    filters,
    page,
    totalPages,
    onPageChange,
    onRemoveKeyword,
    onRemoveGenre,
    onRemoveTone,
}: Props) => (
    <div className={styles.results}>
        <div className={styles.selectedChips}>
            {filters.genre && (
                <RemovableChip label={filters.genre.label} onRemove={onRemoveGenre} />
            )}
            {filters.tone && <RemovableChip label={filters.tone.label} onRemove={onRemoveTone} />}
            {filters.keywords.map((keyword) => (
                <RemovableChip
                    key={keyword.value}
                    label={keyword.label}
                    onRemove={() => onRemoveKeyword(keyword.value)}
                />
            ))}
        </div>
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {shows.length > 0 ? (
                <ul className={styles.grid}>
                    {shows.map((show) => (
                        <ShowCard show={show} key={show.id} />
                    ))}
                </ul>
            ) : (
                !isLoading && <p>No shows found.</p>
            )}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    </div>
);
