import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Link to="/about" className={styles.menu}>
                    About Us
                </Link>
                <div className={styles.copyright}>Copyright © 2025 K-lama</div>
            </div>
        </footer>
    );
};
