import { Button } from "@/components/global/Button";
import styles from "./private.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { LockIcon } from "@/assets/icons/LockIcon";

export const PrivateProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const handleClick = () => {
        navigate(`/profile/${user?.username}`);
    };
    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div>
                <LockIcon width={32} height={32} stroke={2} />
            </div>
            <h2>Private Profile</h2>
            <p>This profile is private and can only be viewed by its owner</p>
            <div className={styles.section}>
                <p>Looking for your own profile?</p>
                <Button variant="primary" onClick={handleClick}>
                    View My Profile
                </Button>
                <div>not logged in? Login first</div>
            </div>
        </div>
    );
};
