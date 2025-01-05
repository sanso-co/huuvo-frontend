import { useEffect, useRef } from "react";

import { useScrollLock } from "@/hooks/useScrollLock";
import { useSearch } from "@/hooks/api/search/useSearch";

import { Modal } from "@/components/global/Modal";
import { DefaultView } from "@/features/Search/DefaultView";
import { SearchCard } from "@/components/feature/SearchCard";
import { SearchIcon } from "@/assets/icons/SearchIcon";

import styles from "./desktopsearch.module.scss";

interface Props {
    open: boolean;
    handleClose: () => void;
    handleClick: (id: number) => void;
}

export const DesktopSearch = ({ open, handleClose, handleClick }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { query, setQuery, suggestions } = useSearch();

    useScrollLock(open);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    return (
        <Modal open={open} handleClose={handleClose}>
            <div className={styles.barContainer}>
                <div className={styles.bar}>
                    <SearchIcon width={21} height={21} stroke={2} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for drama..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
            {suggestions.length > 0 ? (
                <div className={styles.viewContainer}>
                    {suggestions.map((drama) => (
                        <SearchCard
                            show={drama}
                            key={drama.id}
                            handleClick={() => handleClick(drama.id)}
                        />
                    ))}
                </div>
            ) : (
                <DefaultView handleClick={handleClick} />
            )}
        </Modal>
    );
};
