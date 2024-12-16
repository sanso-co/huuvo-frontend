import { useGeneralStore } from "@/store/useStore";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./header.module.scss";
import { Toggle } from "@/components/global/Toggle";
import { useAuthStore } from "@/store/useAuthStore";

export const Header = () => {
    const location = useLocation();
    const detailsPage = location.pathname.includes("details");

    const store = useGeneralStore();
    const { user, logout } = useAuthStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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
                <Link to="/" className={styles.logo}>
                    K
                </Link>
                <div className={styles.nav}>
                    <Link to="/discover">Discover</Link>
                </div>
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
