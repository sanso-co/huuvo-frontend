import { Header } from "@/components/global/Header";

import styles from "./settings.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Settings = () => {
    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div className={styles.header}>
                <Header showProfileImage={false} title="Settings" />
            </div>
            <div className={styles.main}>create personal information update</div>
        </div>
    );
};

export default Settings;
