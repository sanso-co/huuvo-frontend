import { Link, useNavigate } from "react-router-dom";
import { useGeneralStore } from "@/store/useStore";

import { useAuthStore } from "@/store/useAuthStore";

import { Toggle } from "@/components/global/Toggle";

import styles from "./user.module.scss";
import { UserIcon } from "@/assets/icons/UserIcon";

interface Props {
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (isOpen: boolean) => void;
    userRef: React.RefObject<HTMLDivElement>;
}

export const User = ({ userRef, isUserMenuOpen, setIsUserMenuOpen }: Props) => {
    const navigate = useNavigate();
    const store = useGeneralStore();
    const { user, logout } = useAuthStore();

    const handleLanguageToggle = () => {
        const newLanguage = store.language === "en" ? "kr" : "en";
        store.setLanguage(newLanguage);
    };

    const handleAdminClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const goToProfile = () => {
        navigate(`/profile/${user?.username}`);
        setIsUserMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <Toggle value={store.language} onChange={handleLanguageToggle} />
            <div className={styles.avatar} ref={userRef}>
                {user ? (
                    <div onClick={handleAdminClick} className={styles.user}>
                        <UserIcon width={18} height={18} />
                    </div>
                ) : (
                    <div onClick={goToLogin} className={styles.user}>
                        Login
                    </div>
                )}
                {user && (
                    <div
                        className={`${styles.dropdown} ${
                            isUserMenuOpen ? styles.dropdownOpen : ""
                        }`}
                    >
                        <div className={styles.menuContent}>
                            <div>{user?.username}</div>
                            <div onClick={goToProfile}>Profile</div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
