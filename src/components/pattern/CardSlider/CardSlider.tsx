import React, { useEffect, useRef } from "react";

import { LinkButton } from "@/components/global/LinkButton";

import styles from "./cardslider.module.scss";
import layout from "@/assets/styles/layout.module.scss";

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
                <div className={`${styles.header} ${layout.default} ${layout.max}`}>
                    <h3>{title}</h3>
                    {helper && <p className={styles.helper}>{helper}</p>}
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
