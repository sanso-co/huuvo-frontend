import { Link } from "react-router-dom";

import styles from "./chip.module.scss";

interface Props {
    label: string;
    url: string;
}

export const Chip = ({ label, url }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <Link to={url}>{label}</Link>
            </div>
        </div>
    );
};
