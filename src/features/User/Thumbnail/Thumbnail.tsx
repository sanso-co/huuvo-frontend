import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";
import styles from "./thumb.module.scss";
import { Spinner } from "@/components/global/Spinner";
import { Link } from "react-router-dom";

interface Props {
    isLoading: boolean;
    link: string;
    number: number | 0;
    status: "liked" | "bookmarked" | "watched" | "";
    children?: React.ReactNode;
}

export const Thumbnail = ({ isLoading, link, number = 0, status = "", children }: Props) => {
    if (isLoading)
        return (
            <div className={styles.placeholder}>
                <Spinner size="sm" />
            </div>
        );

    return (
        <Link to={link}>
            <div className={styles.thumb}>
                <div className={styles.icon} data-status={status}>
                    {children}
                </div>
                <div className={styles.content}>
                    <div className={styles.number}>{number}</div>
                    <div className={styles.status}>{status}</div>
                </div>
                <div className={styles.chevron}>
                    <ChevronRightIcon />
                </div>
            </div>
        </Link>
    );
};
