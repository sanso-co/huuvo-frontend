import { useEffect, useRef, useState } from "react";
import styles from "./tooltip.module.scss";

interface Props {
    text: string;
    children: React.ReactNode;
}

export const Tooltip = ({ text, children }: Props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<"left" | "center" | "right">("center");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const containerCenter = containerRect.left + containerRect.width / 2;
                const windowCenter = window.innerWidth / 2;
                const threshold = 0;

                if (containerCenter < windowCenter - threshold) {
                    setTooltipPosition("left");
                } else if (containerCenter > windowCenter + threshold) {
                    setTooltipPosition("right");
                } else {
                    setTooltipPosition("center");
                }
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    const getTooltipClasses = (): string => {
        const baseClass = styles.tooltip;
        switch (tooltipPosition) {
            case "left":
                return `${baseClass} ${styles.tooltipLeft}`;
            case "right":
                return `${baseClass} ${styles.tooltipRight}`;
            default:
                return `${baseClass} ${styles.tooltipCenter}`;
        }
    };

    return (
        <div ref={containerRef} className={styles.container}>
            <div
                className={styles.wrapper}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="Show information"
            >
                {children}
            </div>
            {showTooltip && (
                <div className={getTooltipClasses()}>
                    <div className={styles.content}>{text}</div>
                </div>
            )}
        </div>
    );
};
