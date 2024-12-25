import { useGeneralStore } from "@/store/useStore";

import { useAuthStore } from "@/store/useAuthStore";

import { Toggle } from "@/components/global/Toggle";

import styles from "./user.module.scss";

interface Props {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isOpen: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export const User = ({ dropdownRef, isDropdownOpen, setIsDropdownOpen }: Props) => {
    const store = useGeneralStore();
    const { user, logout } = useAuthStore();

    const handleLanguageToggle = () => {
        const newLanguage = store.language === "en" ? "kr" : "en";
        store.setLanguage(newLanguage);
    };

    const handleAdminClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <>
            <Toggle value={store.language} onChange={handleLanguageToggle} />
            <div className={styles.avatar} ref={dropdownRef}>
                <div onClick={handleAdminClick} className={styles.user}>
                    User
                </div>
                {user?.isAdmin && (
                    <div
                        className={`${styles.dropdown} ${
                            isDropdownOpen ? styles.dropdownOpen : ""
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
