import styles from "./button.module.scss";

interface Props {
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const Button = ({ label, disabled, onClick }: Props) => {
    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};
