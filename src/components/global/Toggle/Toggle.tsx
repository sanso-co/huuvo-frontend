import styles from "./toggle.module.scss";

interface Props {
    value: string;
    onChange: (tab: string) => void;
}

export const Toggle = ({ value, onChange }: Props) => {
    const tabs = ["en", "kr"];

    return (
        <div className={styles.toggleContainer}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${styles.toggleButton} ${
                        value === tab ? styles.activeTab : styles.inactiveTab
                    } ${value !== tab ? styles.inactiveTabHover : ""}`}
                    onClick={() => onChange(tab)}
                >
                    {tab}
                </button>
            ))}
            <div
                className={styles.slider}
                style={{
                    transform: `translateX(${value === "en" ? "0" : "100%"})`,
                }}
            ></div>
        </div>
    );
};
