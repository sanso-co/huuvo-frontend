import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGeneralStore } from "@/store/useStore";
import { MENU } from "@/helpers/constants/menu";

import { Toggle } from "@/components/global/Toggle";
import { useAuthStore } from "@/store/useAuthStore";

import { Modal } from "@/components/global/Modal";
import { SearchIcon } from "@/assets/icons/SearchIcon";

import styles from "./header.module.scss";

import { Search } from "@/features/Search";

export const Header = () => {
    const location = useLocation();
    const detailsPage = location.pathname.includes("details");

    const store = useGeneralStore();
    const { user, logout } = useAuthStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLanguageToggle = () => {
        const newLanguage = store.language === "en" ? "kr" : "en";
        store.setLanguage(newLanguage);
    };

    const handleAdminClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        K
                    </Link>
                    <ul className={styles.nav}>
                        {MENU.map((item) => (
                            <li key={item.url}>
                                <Link
                                    to={item.url}
                                    className={location.pathname === item.url ? styles.current : ""}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
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
                <div className={styles.right}>
                    {!detailsPage && (
                        <div className="flex gap-05">
                            <Toggle value={store.language} onChange={handleLanguageToggle} />
                        </div>
                    )}
                    {user?.isAdmin && (
                        <div className={styles.admin} ref={dropdownRef}>
                            <div onClick={handleAdminClick}>Admin</div>
                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
