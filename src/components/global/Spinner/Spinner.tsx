import styles from "./spinner.module.scss";

interface Props {
    text?: string;
}

export const Spinner = ({ text }: Props) => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            {text && <p>{text}</p>}
        </div>
    );
};
