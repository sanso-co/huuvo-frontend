import { Tooltip } from "@/components/global/Tooltip";
import styles from "./languagetoggle.module.scss";

interface Props {
    value: string;
    onChange: (tab: string) => void;
}

export const LanguageToggle = ({ value, onChange }: Props) => {
    return (
        <div className={styles.toggleContainer}>
            <button
                className={`${styles.toggleButton} ${
                    value === "en" ? styles.activeTab : styles.inactiveTab
                } ${value !== "en" ? styles.inactiveTabHover : ""}`}
                onClick={() => onChange("en")}
            >
                en
            </button>
            <Tooltip text="Full Korean support coming soon">
                <button
                    className={`${styles.toggleButton} ${
                        value === "kr" ? styles.activeTab : styles.inactiveTab
                    } ${value !== "kr" ? styles.inactiveTabHover : ""}`}
                    onClick={() => onChange("kr")}
                >
                    kr
                </button>
            </Tooltip>

            <div
                className={styles.slider}
                style={{
                    transform: `translateX(${value === "en" ? "0" : "100%"})`,
                }}
            ></div>
        </div>
    );
};
