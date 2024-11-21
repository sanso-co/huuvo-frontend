import React, { useEffect, useRef } from "react";
import styles from "./contentslider.module.scss";

interface Props {
    children: React.ReactNode;
}

export const ContentSlider = ({ children }: Props) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }
    }, [children]);

    return (
        <div ref={sliderRef} className={styles.container}>
            {children}
        </div>
    );
};
