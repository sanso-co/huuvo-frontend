import React from "react";

import styles from "./cardslider.module.scss";
import { LinkButton } from "@/components/global/LinkButton";

interface Props {
    helper?: string;
    title?: string;
    linkLabel?: string;
    linkTo?: string;
    children: React.ReactNode;
}

export const CardSlider = ({ linkLabel, linkTo, helper, title, children }: Props) => {
    return (
        <section className={styles.section}>
            {title && (
                <div className={styles.header}>
                    <h3>{title}</h3>
                    {helper && <p className="caption">{helper}</p>}
                    {linkTo && (
                        <LinkButton to={linkTo}>
                            <span>{linkLabel}</span>
                        </LinkButton>
                    )}
                </div>
            )}
            <div className={styles.container}>{children}</div>
        </section>
    );
};
