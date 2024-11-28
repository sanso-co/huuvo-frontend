import { OptionType } from "@/types/filter";
import styles from "./radio.module.scss";

interface Props {
    name: string;
    options: OptionType[];
    selectedValue?: string;
    onChange: (selectedOptions: OptionType) => void;
    isExpanded?: boolean;
    onExpand: (expanded: boolean) => void;
}

export const RadioSelect = ({
    name,
    options,
    selectedValue,
    onChange,
    isExpanded,
    onExpand,
}: Props) => {
    const handleOptionChange = (option: OptionType) => {
        onChange(option);
    };

    const displayedOptions = isExpanded ? options : options.slice(0, 5);
    const hasMoreOptions = options.length > 5;

    return (
        <div className={styles.container}>
            <h3>{name}</h3>
            <div className={styles.options}>
                {displayedOptions.map((option) => (
                    <div key={option._id} className={styles.option}>
                        <label>
                            <input
                                type="radio"
                                name={name}
                                value={option._id}
                                checked={selectedValue === option._id}
                                onChange={() => handleOptionChange(option)}
                            />
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
            {hasMoreOptions && (
                <button onClick={() => onExpand(!isExpanded)} className={styles.button}>
                    {isExpanded ? <span>Show Less</span> : <span>Show More...</span>}
                </button>
            )}
        </div>
    );
};
