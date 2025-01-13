import { FormProvider, useForm } from "react-hook-form";

import { Header } from "@/components/global/Header";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import styles from "./settings.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface FormValues {
    username: string;
    email: string;
}

const Settings = () => {
    const defaultValues = {
        username: "",
        email: "",
    };

    const methods = useForm({ defaultValues });

    const onSubmit = async (data: FormValues) => {};

    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div className={styles.header}>
                <Header showProfileImage={false} title="Settings" />
            </div>
            <div className={styles.main}>
                create personal information update
                {/* <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input label="Username" name="username" />
                        <Input label="Email" name="email" />
                        <Button type="submit" label="Submit" variant="primary" width="full" />
                    </form>
                </FormProvider> */}
            </div>
        </div>
    );
};

export default Settings;
