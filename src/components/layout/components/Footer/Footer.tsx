import styles from "./footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>Copyright © 2024 K-lama</div>
            </div>
        </footer>
    );
};
