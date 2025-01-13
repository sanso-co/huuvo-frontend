import { FormProvider, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { useAuth } from "@/hooks/api/auth/useAuth";
import { validationRules } from "@/helpers/validationRules";

import { GoogleButton } from "@/components/feature/Auth/GoogleButton";
import { Alert } from "@/components/global/Status";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import styles from "./auth.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface FormValues {
    username: string;
    email: string;
    password: string;
}

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSignup = location.pathname && location.pathname === "/signup";
    const from = location.state?.from?.pathname || "/";

    const defaultValues = {
        username: "",
        email: "",
        password: "",
    };

    const methods = useForm({ defaultValues, mode: "onChange" });
    const { login, signup, googleAuth, error } = useAuth();
    const {
        formState: { isValid },
    } = methods;

    const onGoogleSubmit = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Send the access_token to your backend
                const isLoggedIn = await googleAuth(tokenResponse.access_token);
                if (isLoggedIn) {
                    navigate(from, { replace: true });
                }
            } catch (error) {
                console.error("Google login failed:", error);
            }
        },
        onError: () => {
            console.error("Google login failed");
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            if (isSignup) {
                const userData = await signup(data);
                if (userData) {
                    // navigate(from, { replace: true });
                    navigate("/settings");
                }
            } else {
                const isLoggedIn = await login(data.username, data.password);
                if (isLoggedIn) {
                    navigate(from, { replace: true });
                }
            }
        } catch (error) {
            console.error(isSignup ? "Signup failed:" : "Login failed:", error);
        }
    };

    return (
        <div className={`${layout.default} ${layout.small} ${styles.container}`}>
            <div className={styles.header}>
                <h1>{isSignup ? "Create an account" : "Login"}</h1>

                {isSignup ? (
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                ) : (
                    <p>
                        New to K-lama? <Link to="/signup">Sign up</Link>
                    </p>
                )}
            </div>
            <div>
                <GoogleButton handleGoogleButton={onGoogleSubmit} />
            </div>
            <div className={styles.divider}>
                <hr />
                <p>or</p>
                <hr />
            </div>
            {error && <Alert message={error.message} />}
            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input label="Username" name="username" validation={validationRules.username} />
                    {isSignup && (
                        <Input label="Email" name="email" validation={validationRules.email} />
                    )}
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        validation={validationRules.password}
                    />
                    <Button
                        type="submit"
                        label={isSignup ? "Create Account" : "Log in"}
                        variant="primary"
                        width="full"
                        disabled={!isValid}
                    />
                </form>
            </FormProvider>
        </div>
    );
};

export default Auth;
