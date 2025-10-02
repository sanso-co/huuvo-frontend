import { useForm, FormProvider } from "react-hook-form";

import { useAuthStore } from "@/store/useAuthStore";

import { Header } from "@/components/global/Header";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import styles from "./settings.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface IPersonalInfo {
    email: string;
}

interface IPasswords {
    currentPassword: string;
    newPassword: string;
}

const Settings = () => {
    const { user } = useAuthStore();

    const personalInfoMethods = useForm<IPersonalInfo>({
        defaultValues: {
            email: user?.email || "",
        },
        mode: "onChange",
    });

    const passwordMethods = useForm<IPasswords>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
        mode: "onChange",
    });

    const handleInfoSubmit = async (data: IPersonalInfo) => {
        console.log("New email:", data.email);
        // Add email update logic here
    };

    const handlePasswordSubmit = async (data: IPasswords) => {
        console.log("Password update:", data);
        // Add password update logic here
        passwordMethods.reset(); // Reset form after submission
    };

    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div className={styles.header}>
                <Header
                    showProfileImage={false}
                    title={user?.username ? `Hello, ${user?.username}` : "Settings"}
                />
            </div>
            <div className={styles.main}>
                <FormProvider {...personalInfoMethods}>
                    <form
                        className={styles.section}
                        onSubmit={personalInfoMethods.handleSubmit(handleInfoSubmit)}
                    >
                        <h2>Personal Information</h2>
                        <Input label="Username" name="username" value={user?.username} disabled />
                        <Input
                            label="Email"
                            name="email"
                            validation={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!personalInfoMethods.formState.isValid}
                        >
                            Save Changes
                        </Button>
                    </form>
                </FormProvider>

                <FormProvider {...passwordMethods}>
                    <form
                        className={styles.section}
                        onSubmit={passwordMethods.handleSubmit(handlePasswordSubmit)}
                    >
                        <h2>Change Password</h2>
                        <Input
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            validation={{
                                required: "Current password is required",
                            }}
                        />
                        <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            validation={{
                                required: "New password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                // Add any other password validation rules
                            }}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!passwordMethods.formState.isValid}
                        >
                            Submit
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Settings;
