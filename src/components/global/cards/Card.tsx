import { ReactNode } from "react";
import { ImageContainer } from "@/components/global/ImageContainer";

import styles from "./card.module.scss";

interface Props {
    width?: string;
    children: ReactNode;
}

export const Card = ({ children, width }: Props) => {
    return (
        <div className={styles.container} style={{ width }}>
            {children}
        </div>
    );
};

Card.Image = ImageContainer;
