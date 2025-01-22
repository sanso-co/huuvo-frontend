import { Link } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";

import { Header } from "@/components/global/Header";

import styles from "./profile.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { useUserShowCounts } from "@/hooks/api/user/useUserShow";
import { Thumbnail } from "@/features/User/Thumbnail";

const Profile = () => {
    const { user } = useAuthStore();
    const { details } = useUserShowCounts();

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
                        <h2>Liked</h2>
                        <Link to={"/profile/shows/liked"}>
                            <div>liked: {details?.liked?.count} </div>
                            <Thumbnail shows={details?.liked.shows || []} />
                        </Link>
                    </div>
                    <div className={styles.section}>
                        <h2>Watch Later</h2>
                        <Link to={"/profile/shows/watchlist"}>
                            <div>watchlist: {details?.watchlist.count} </div>
                            <Thumbnail shows={details?.watchlist.shows || []} />
                        </Link>
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.section}>
                        <h2>Disliked</h2>
                        <Link to={"/profile/shows/disliked"}>
                            <div>disliked: {details?.disliked} </div>
                        </Link>
                    </div>
                    <div className={styles.section}>
                        <h2>Already Watched</h2>
                        <Link to={"/profile/shows/watched"}>
                            <div>watched: {details?.watched}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
