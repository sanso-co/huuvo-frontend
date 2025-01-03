import { useGeneralStore } from "@/store/useStore";

import { useAuthStore } from "@/store/useAuthStore";

import { Toggle } from "@/components/global/Toggle";

import styles from "./user.module.scss";

interface Props {
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (isOpen: boolean) => void;
    userRef: React.RefObject<HTMLDivElement>;
}

export const User = ({ userRef, isUserMenuOpen, setIsUserMenuOpen }: Props) => {
    const store = useGeneralStore();
    const { user, logout } = useAuthStore();

    const handleLanguageToggle = () => {
        const newLanguage = store.language === "en" ? "kr" : "en";
        store.setLanguage(newLanguage);
    };

    const handleAdminClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <Toggle value={store.language} onChange={handleLanguageToggle} />
            <div className={styles.avatar} ref={userRef}>
                <div onClick={handleAdminClick} className={styles.user}>
                    User
                </div>
                {user?.isAdmin && (
                    <div
                        className={`${styles.dropdown} ${
                            isUserMenuOpen ? styles.dropdownOpen : ""
                        }`}
                    >
                        <div className={styles.menuContent}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
