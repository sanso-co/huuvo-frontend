import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { useAuth } from "@/hooks/api/auth/useAuth";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";
import { Alert } from "@/components/global/Status";

import styles from "./complete.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface FormValues {
    username: string;
}

const Complete = () => {
    const navigate = useNavigate();

    const defaultValues = {
        username: "",
    };

    const methods = useForm({ defaultValues });

    const { completeProfile, error } = useAuth();

    const onSubmit = async (data: FormValues) => {
        try {
            const userData = await completeProfile(data.username);
            if (userData) {
                // navigate(from, { replace: true });
                navigate("/settings");
            }
        } catch (error) {
            console.error("Failed to complete profile", error);
        }
    };

    return (
        <div className={`${layout.default} ${layout.small} ${styles.container}`}>
            <div className={styles.header}>
                <h1>Create Username</h1>
                <p>Complete registration by creating a username</p>
            </div>
            {error && <Alert message={error.message} />}
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input label="Username" name="username" />
                    <Button type="submit" variant="primary" width="full">
                        Submit
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};

export default Complete;
