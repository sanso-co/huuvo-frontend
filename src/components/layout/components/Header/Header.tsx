import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useIsMobile } from "@/hooks/useIsMobile";

import { Navigation } from "./components/Navigation";
import { HeaderSearch } from "./components/Search";
import { User } from "./components/User";

import styles from "./header.module.scss";

export const Header = () => {
    const isMobile = useIsMobile();

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const navigationRef = useRef<HTMLDivElement | null>(null);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
            if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
                setIsNavigationOpen(false);
            }
        };

        const handleHeroClick = () => {
            if (isNavigationOpen) {
                setIsNavigationOpen(false);
            }
            if (isUserMenuOpen) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        const heroElement = document.querySelector(".hero");
        if (heroElement) {
            heroElement.addEventListener("click", handleHeroClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            const heroElement = document.querySelector(".hero");
            if (heroElement) {
                heroElement.removeEventListener("click", handleHeroClick);
            }
        };
    }, [navigationRef, userRef, isNavigationOpen, isUserMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        K
                    </Link>
                    <Navigation
                        isMobile={isMobile}
                        isNavigationOpen={isNavigationOpen}
                        setIsNavigationOpen={setIsNavigationOpen}
                        navigationRef={navigationRef}
                    />
                </div>
                <HeaderSearch />
                <div className={styles.right}>
                    <User
                        isUserMenuOpen={isUserMenuOpen}
                        setIsUserMenuOpen={setIsUserMenuOpen}
                        userRef={userRef}
                    />
                </div>
            </div>
        </header>
    );
};
