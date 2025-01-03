import { Link, useLocation } from "react-router-dom";
import { MENU } from "@/helpers/constants/menu";
import { ChevronDownSmIcon } from "@/assets/icons/ChevronDownSmIcon";
import styles from "./navigation.module.scss";

interface NavigationProps {
    isMobile: boolean;
    isNavigationOpen: boolean;
    setIsNavigationOpen: (isOpen: boolean) => void;
    navigationRef: React.RefObject<HTMLDivElement>;
}

export const Navigation = ({
    isMobile,
    isNavigationOpen,
    setIsNavigationOpen,
    navigationRef,
}: NavigationProps) => {
    const location = useLocation();

    const getCurrentPageName = (pathname: string) => {
        return MENU.find((item) => item.url === pathname)?.name || "Menu";
    };

    if (!isMobile) {
        return (
            <div className={styles.desktop}>
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
        );
    }

    return (
        <div className={styles.mobile} ref={navigationRef}>
            <div
                className={styles.dropdownMenu}
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}
            >
                <span>{getCurrentPageName(location.pathname)}</span>
                <ChevronDownSmIcon width={21} height={21} stroke={2} />
            </div>

            <div
                className={`${styles.mobileMenu} ${isNavigationOpen ? styles.mobileMenuOpen : ""}`}
            >
                <ul className={styles.mobileNav}>
                    {MENU.map((item) => (
                        <li key={item.url}>
                            <Link
                                to={item.url}
                                onClick={() => setIsNavigationOpen(false)}
                                className={location.pathname === item.url ? styles.current : ""}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
