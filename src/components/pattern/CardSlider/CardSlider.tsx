import React, { useEffect, useRef } from "react";

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
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }
    }, [children]);

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
            <div ref={sliderRef} className={styles.container}>
                {children}
            </div>
        </section>
    );
};
