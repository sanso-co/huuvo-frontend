import { useAuthStore } from "@/store/useAuthStore";

import { useUserShowCounts } from "@/hooks/api/user/useUserShow";

import { Thumbnail } from "@/features/User/Thumbnail";
import { Header } from "@/components/global/Header";

import { brand } from "@/components/token";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { CheckmarkIcon } from "@/assets/icons/CheckmarkIcon";

import styles from "./profile.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { useParams } from "react-router-dom";
import { PrivateProfile } from "@/features/User/PrivateProfile";

const Profile = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const { details, isLoading } = useUserShowCounts();

    const isOwnProfile = !id || id === user?.username;

    if (!isOwnProfile) {
        return <PrivateProfile />;
    }

    return (
        <div className={`${styles.container} ${layout.default} ${layout.max}`}>
            <div className={styles.header}>
                <Header
                    showProfileImage={false}
                    title={user?.username ? `Hello, ${user?.username}` : "Settings"}
                />
            </div>
            <div className={styles.main}>
                <div className={styles.group}>
                    <div className={styles.section}>
                        <Thumbnail
                            status="liked"
                            link="/profile/shows/liked"
                            number={details?.liked?.count || 0}
                            isLoading={isLoading}
                        >
                            <HeartIcon width={26} height={26} stroke={0} fill={brand.tomato} />
                        </Thumbnail>
                    </div>
                    <div className={styles.section}>
                        <Thumbnail
                            status="bookmarked"
                            number={details?.bookmarked.count || 0}
                            link="/profile/shows/bookmarked"
                            isLoading={isLoading}
                        >
                            <BookmarkIcon width={26} height={26} stroke={0} fill="#000" />
                        </Thumbnail>
                    </div>
                    <div className={styles.section}>
                        <Thumbnail
                            status="watched"
                            number={details?.watched || 0}
                            link="/profile/shows/watched"
                            isLoading={isLoading}
                        >
                            <CheckmarkIcon width={26} height={26} stroke={3} />
                        </Thumbnail>
                    </div>
                </div>

                {/* <div className={styles.section}>
                        <h2>Disliked</h2>
                        <Link to={"/profile/shows/disliked"}>
                            <div>disliked: {details?.disliked} </div>
                        </Link>
                    </div> */}
            </div>
        </div>
    );
};

export default Profile;
