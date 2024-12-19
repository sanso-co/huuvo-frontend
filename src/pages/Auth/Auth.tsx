import { TextInput } from "@/components/global/TextInput";
import styles from "./auth.module.scss";
import { Header } from "@/components/global/Header";
import { useAuth } from "@/hooks/api/auth/useAuth";
import { useState } from "react";

const Auth = () => {
    const [password, setPassword] = useState("");
    const { loginAdmin } = useAuth();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await loginAdmin("fw7128@gmail.com", password);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <Header
                    showProfileImage={false}
                    title="Login"
                    description="Are you an admin? Login below"
                />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default Auth;
