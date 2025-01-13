import { WarningIcon } from "@/assets/icons/WarningIcon";
import styles from "./alert.module.scss";

interface Props {
    message: string;
}

export const Alert = ({ message }: Props) => {
    return (
        <div className={styles.container}>
            <WarningIcon color="#D20012" />
            <span>{message}</span>
        </div>
    );
};
