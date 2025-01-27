import styles from "./spinner.module.scss";

interface Props {
    size?: "sm" | "md" | "lg";
    text?: string;
}

export const Spinner = ({ size = "md", text }: Props) => {
    return (
        <div className={styles.loaderContainer} data-size={size}>
            <div className={styles.spinner}></div>
            {text && <p>{text}</p>}
        </div>
    );
};
