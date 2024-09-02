import styles from "./iconcontainer.module.scss";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

export const IconContainer = ({ children, onClick }: Props) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {children}
        </div>
    );
};
