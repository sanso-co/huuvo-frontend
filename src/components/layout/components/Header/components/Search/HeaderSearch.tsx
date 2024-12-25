import { useState } from "react";
import { Search } from "@/features/Search";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import { Modal } from "@/components/global/Modal";

import styles from "./search.module.scss";

export const HeaderSearch = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <div className={styles.search}>
                <button onClick={() => setIsSearchOpen(true)}>
                    <SearchIcon width={18} height={18} stroke={2} />
                    <span className={styles.label}>Search Drama...</span>
                </button>
            </div>
            {isSearchOpen && (
                <Modal open={isSearchOpen} handleClose={() => setIsSearchOpen(false)}>
                    <Search open={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                </Modal>
            )}
        </>
    );
};
