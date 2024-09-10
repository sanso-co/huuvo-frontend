import { ReactNode } from "react";
import { ImageContainer } from "@/components/global/ImageContainer";

import styles from "./card.module.scss";

interface Props {
    children: ReactNode;
}

export const Card = ({ children }: Props) => {
    return <div className={styles.container}>{children}</div>;
};

Card.Image = ImageContainer;
