import { useGetProfile } from "@/hooks/api/about/useCompanyProfile";
import { Markdown } from "@/components/global/Markdown";

import styles from "./about.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { Header } from "@/components/global/Header";

const About = () => {
    const { profile } = useGetProfile();

    return (
        <div className={`${styles.container} ${styles.top} ${layout.max}`}>
            <div className={styles.header}>
                <Header showProfileImage={false} title="About K-lama" />
            </div>
            <Markdown initialValue={profile?.about} />
        </div>
    );
};

export default About;
