import styles from "./loader.module.scss";

interface Props {
    text?: string;
    padding?: string;
    height?: string;
}

export const Loader = ({ text, padding, height }: Props) => {
    const containerStyle = {
        "--custom-padding": padding,
        "--container-height": height || "300px",
    } as React.CSSProperties;

    return (
        <div className={styles.loaderContainer} style={containerStyle}>
            <div className={styles.spinner}></div>
            {text && <p>{text}</p>}
        </div>
    );
};
