import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import styles from "./status.module.scss";
import details from "@/assets/styles/details.module.scss";
import { useUserShowRating } from "@/hooks/api/user/useUserShow";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { useUserInteractions } from "@/hooks/api/user/useUserInteractions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
    id: string;
}

export const Status = ({ id }: Props) => {
    const { id: showId } = useParams();
    const { status: initialStatus, isLoading, error } = useUserShowRating(id);
    const [status, setStatus] = useState(initialStatus);
    const { likeShow, bookmarkShow } = useUserInteractions();

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    const handleLike = async () => {
        try {
            setStatus((prevStatus) => {
                if (!prevStatus) return prevStatus;
                return {
                    ...prevStatus,
                    liked: !prevStatus.liked,
                };
            });

            await likeShow(showId || "");
        } catch (error) {
            setStatus((prevStatus) =>
                prevStatus
                    ? {
                          ...prevStatus,
                          liked: !prevStatus.liked,
                      }
                    : prevStatus
            );
            console.error(error);
        }
    };

    const handleBookmark = async () => {
        try {
            setStatus((prevStatus) => {
                if (!prevStatus) return prevStatus;
                return {
                    ...prevStatus,
                    bookmarked: !prevStatus.bookmarked,
                };
            });

            await bookmarkShow(showId || "");
        } catch (error) {
            setStatus((prevStatus) =>
                prevStatus
                    ? {
                          ...prevStatus,
                          bookmarked: !prevStatus.bookmarked,
                      }
                    : prevStatus
            );
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading providers...</div>;
    if (error) return null;

    return (
        <div className={details.section}>
            <div className={styles.container}>
                <button className={styles.button} onClick={handleLike}>
                    <HeartIcon
                        width={18}
                        height={18}
                        stroke={0}
                        fill={status?.liked ? "#000" : "#e7e7e7"}
                    />
                </button>
                <button className={styles.button} onClick={handleBookmark}>
                    <BookmarkIcon
                        width={18}
                        height={18}
                        stroke={0}
                        fill={status?.bookmarked ? "#000" : "#e7e7e7"}
                    />
                </button>
            </div>
        </div>
    );
};
