import { getProfileImage } from "@/services/image-url";

import styles from "./profile.module.scss";
import { UserIcon } from "@/assets/icons/UserIcon";

interface Props {
    url?: string;
}

export const ProfileImage = ({ url }: Props) => {
    const imageUrl = getProfileImage(url);
    const noImage = imageUrl === "no-image";

    return (
        <div className={styles.container}>
            {noImage ? (
                <UserIcon width={30} height={30} stroke={1.5} />
            ) : (
                <img src={imageUrl} alt="" />
            )}
        </div>
    );
};
