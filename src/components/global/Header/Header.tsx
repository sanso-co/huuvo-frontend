import { ProfileImage } from "@/components/global/ProfileImage";
import styles from "./header.module.scss";

interface Props {
    showProfileImage: boolean;
    profileImageUrl?: string;
    title: string;
    description?: string;
}

export const Header = ({ showProfileImage, profileImageUrl, title, description }: Props) => {
    return (
        <div className={styles.container}>
            {showProfileImage && <ProfileImage url={profileImageUrl} />}
            <div className={styles.text}>
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};
