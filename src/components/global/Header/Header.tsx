import styles from "./header.module.scss";

interface Props {
    title: string;
    description: string;
}

export const Header = ({ title, description }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </div>
    );
};
