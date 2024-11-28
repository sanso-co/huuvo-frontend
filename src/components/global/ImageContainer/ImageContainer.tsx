import { useEffect, useState } from "react";
import { MediaIcon } from "@/assets/icons/MediaIcon";
import { TrailerTypeTMDB } from "@/types/showDetail";

import styles from "./imagecontainer.module.scss";

interface Props {
    src: string;
    ratio?: string;
    rounded?: string;
    width?: string;
    video?: TrailerTypeTMDB[];
}

export const ImageContainer = ({ src, ratio, rounded, width }: Props) => {
    const [naturalRatio, setNaturalRatio] = useState<string | undefined>(ratio);

    useEffect(() => {
        if (src && src !== "no-image") {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                const calculatedRatio = (img.naturalWidth / img.naturalHeight).toFixed(2);
                setNaturalRatio(calculatedRatio);
            };
        }
    }, [src]);

    const containerClasses = [
        styles.container,
        width ? styles.customWidth : "",
        rounded ? styles.rounded : "",
        ratio ? styles.customRatio : "",
    ]
        .filter(Boolean)
        .join(" ");

    const containerStyle = {
        "--custom-width": width,
        "--rounded": rounded,
        "--aspect-ratio": ratio || naturalRatio,
    } as React.CSSProperties;

    const noImage = src === "no-image";

    return (
        <div className={containerClasses} style={containerStyle}>
            {noImage ? (
                <div className={styles.placeholder}>
                    <MediaIcon />
                </div>
            ) : (
                <img src={src} alt="" />
            )}
        </div>
    );
};
