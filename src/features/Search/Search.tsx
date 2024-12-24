import { useEffect, useRef } from "react";

import { useSearch } from "@/hooks/api/search/useSearch";
import { SearchIcon } from "@/assets/icons/SearchIcon";

import styles from "./search.module.scss";
import { SearchCard } from "@/components/feature/SearchCard";
import { useNavigate } from "react-router-dom";

interface Props {
    open: boolean;
    setIsSearchOpen: (value: boolean) => void;
}

export const Search = ({ open, setIsSearchOpen }: Props) => {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const { query, setQuery, suggestions } = useSearch();

    const handleClick = (id: number) => {
        navigate(`/details/${id}`);
        setIsSearchOpen(false);
    };

    useEffect(() => {
        if (open) {
            // Small timeout to ensure the modal is rendered
            setTimeout(() => {
                searchRef.current?.focus();
            }, 0);
        }
    }, [open]);

    return (
        <div>
            <div className={styles.searchInput}>
                <SearchIcon width={21} height={21} stroke={2} />
                <input
                    type="text"
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for drama..."
                />
            </div>
            {suggestions.length > 0 ? (
                <div className={styles.suggestedList}>
                    {suggestions.map((drama) => (
                        <SearchCard
                            show={drama}
                            key={drama.id}
                            handleClick={() => handleClick(drama.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.suggestedDefault}></div>
            )}
        </div>
    );
};
