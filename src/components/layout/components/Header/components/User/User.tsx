import { useLocation, useNavigate } from "react-router-dom";

import { useGeneralStore } from "@/store/useStore";
import { useAuthStore } from "@/store/useAuthStore";

import { Toggle } from "@/components/global/Toggle";
import { UserIcon } from "@/assets/icons/UserIcon";

import styles from "./user.module.scss";
import { UserCircleIcon } from "@/assets/icons/UserCircleIcon";
import { SettingIcon } from "@/assets/icons/SettingIcon";
import { LogoutIcon } from "@/assets/icons/LogoutIcon";

interface Props {
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (isOpen: boolean) => void;
    userRef: React.RefObject<HTMLDivElement>;
}

export const User = ({ userRef, isUserMenuOpen, setIsUserMenuOpen }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
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
        navigate("/login", { state: { from: location } });
    };

    const goToProfile = () => {
        navigate(`/profile/${user?.username}`);
        setIsUserMenuOpen(false);
    };

    const handleLogout = () => {
        const currentLocation = window.location.pathname;

        logout();
        setIsUserMenuOpen(false);

        window.location.href = currentLocation;
    };

    return (
        <>
            <Toggle value={store.language} onChange={handleLanguageToggle} />
            <div className={styles.avatar} ref={userRef}>
                {user ? (
                    <div onClick={handleAdminClick} className={styles.user}>
                        {user.avatar ? (
                            <img src={user.avatar || ""} alt="" />
                        ) : (
                            <UserIcon width={18} height={18} />
                        )}
                    </div>
                ) : (
                    <button onClick={goToLogin} className={styles.login}>
                        Login
                    </button>
                )}
                {user && (
                    <div
                        className={`${styles.dropdown} ${
                            isUserMenuOpen ? styles.dropdownOpen : ""
                        }`}
                    >
                        <div className={styles.menuContent}>
                            <div className={styles.info}>
                                <div>{user.username}</div>
                            </div>
                            <div className={styles.menu}>
                                <div className={styles.menuItem} onClick={goToProfile}>
                                    <UserCircleIcon stroke={1.5} />
                                    <span>Profile</span>
                                </div>
                                <div className={styles.menuItem} onClick={goToProfile}>
                                    <SettingIcon stroke={1.5} />
                                    <span>Settings</span>
                                </div>
                                <div className={styles.menuItem} onClick={handleLogout}>
                                    <LogoutIcon stroke={1.5} />
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
