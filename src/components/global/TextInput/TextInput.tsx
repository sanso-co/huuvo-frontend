import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./textinput.module.scss";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface Props extends InputProps {
    label?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextInput = ({ label, name, onChange, ...rest }: Props) => {
    return (
        <div className={styles.container}>
            {label && <label htmlFor={name}>{label}</label>}
            <input name={name} onChange={onChange} {...rest} />
        </div>
    );
};
