import { Link } from "react-router-dom";
import styles from "./button.module.scss";

interface Props {
    children?: React.ReactNode;
    to: string;
}

export const LinkButton = ({ children, to }: Props) => {
    return (
        <Link className={styles.button} to={to}>
            {children}
        </Link>
    );
};
