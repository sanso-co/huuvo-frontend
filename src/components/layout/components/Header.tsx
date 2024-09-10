import { useGeneralStore } from "@/store/useStore";

import { Link, useLocation } from "react-router-dom";

import styles from "./header.module.scss";

export const Header = () => {
    const location = useLocation();
    const detailsPage = location.pathname.includes("details");

    const store = useGeneralStore();
    const handleLanguage = (language: string) => {
        store.setLanguage(language);
    };

    return (
        <header>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    K-
                </Link>
                {/* <div>search</div>
        <div>login</div> */}
                {!detailsPage && (
                    <div className="flex gap-05">
                        <button onClick={() => handleLanguage("kr")}>KR</button>
                        <button onClick={() => handleLanguage("en")}>EN</button>
                    </div>
                )}
            </div>
        </header>
    );
};
