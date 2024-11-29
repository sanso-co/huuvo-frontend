import { DismissIcon } from "@/assets/icons/DismissIcon";
import styles from "./chip.module.scss";

interface Props {
    label: string;
    onRemove: () => void;
}

export const RemovableChip = ({ label, onRemove }: Props) => {
    return (
        <div className={styles.container} onClick={onRemove}>
            <div className={styles.flex}>{label}</div>
            <button className={styles.dismiss}>
                <DismissIcon width={12} height={12} stroke={2} />
            </button>
        </div>
    );
};
