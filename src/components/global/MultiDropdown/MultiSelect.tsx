import { OptionType } from "@/types/filter";
import { CheckmarkIcon } from "@/assets/icons/CheckmarkIcon";
import styles from "./multi.module.scss";

interface Props {
    name: string;
    options: OptionType[];
    selectedValues: string[];
    onChange: (selectedOptions: OptionType[]) => void;
    isExpanded?: boolean;
    onExpand: (expanded: boolean) => void;
}

export const MultiSelect = ({
    name,
    options,
    selectedValues,
    onChange,
    isExpanded,
    onExpand,
}: Props) => {
    const handleOptionChange = (option: OptionType) => {
        const selectedOptions = options.filter(
            (opt) => selectedValues.includes(opt._id) || opt._id === option._id
        );

        if (selectedValues.includes(option._id)) {
            onChange(selectedOptions.filter((opt) => opt._id !== option._id));
        } else {
            onChange(selectedOptions);
        }
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
                            <div className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name={option.name}
                                    value={option._id}
                                    checked={selectedValues.includes(option._id)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {selectedValues.includes(option._id) && (
                                    <CheckmarkIcon width={16} height={16} stroke={3} />
                                )}
                            </div>
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
