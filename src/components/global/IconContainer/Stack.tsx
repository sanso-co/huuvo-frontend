import styles from "./stack.module.scss";

interface Props {
    children: React.ReactNode;
    border?: boolean;
    gap?: string;
    padding?: string;
}

export const Stack = ({ border, children, gap, padding }: Props) => {
    const containerClasses = [
        styles.container,
        gap ? styles.customGap : "",
        padding ? styles.customPadding : "",
        border ? styles.borderBottom : "",
    ]
        .filter(Boolean)
        .join(" ");

    const containerStyle = {
        "--custom-gap": gap,
        "--custom-padding": padding,
    } as React.CSSProperties;

    return (
        <div className={containerClasses} style={containerStyle}>
            {children}
        </div>
    );
};
