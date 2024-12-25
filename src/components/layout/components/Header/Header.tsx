import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Navigation } from "./components/Navigation";
import { HeaderSearch } from "./components/Search";
import { User } from "./components/User";

export const Header = () => {
    const isMobile = useIsMobile();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, mobileDropdownRef]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        K
                    </Link>
                    <Navigation
                        isMobile={isMobile}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        mobileDropdownRef={mobileDropdownRef}
                    />
                </div>
                <HeaderSearch />
                <div className={styles.right}>
                    <User
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        dropdownRef={dropdownRef}
                    />
                </div>
            </div>
        </header>
    );
};
