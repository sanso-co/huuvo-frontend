import styles from "./radio.module.scss";

interface OptionProps {
    label: string;
    value: string;
    emoji?: string;
}

interface Props {
    name: string;
    options: OptionProps[];
    defaultValue?: string;
    size?: "default" | "sm";
    value: string | number;
    onChange: (value: string) => void;
}

export const RadioChips = ({ name, options, value, onChange, size = "default" }: Props) => {
    return (
        <div className={styles.options}>
            {options.map((option) => (
                <label
                    key={option.value}
                    htmlFor={`${name}-${option.value}`}
                    className={styles.option}
                >
                    <input
                        type="radio"
                        id={`${name}-${option.value}`}
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className={styles.radioInput}
                    />
                    <span>{option.emoji}</span>
                    <span data-size={size} className={styles.optionLabel}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
};
