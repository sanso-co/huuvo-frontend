import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./input.module.scss";
import { ValidationRules } from "@/types/validations";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    disabled?: boolean;
    validation?: ValidationRules;
}

export const Input = ({ name, label, disabled = false, validation, ...rest }: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const error = errors[name];

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                {...register(name, validation)}
                disabled={disabled}
                className={`${styles.input} ${error ? styles.error : ""}`}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{error.message as string}</span>}
        </div>
    );
};
