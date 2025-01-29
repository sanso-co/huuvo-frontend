import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUserShowRating } from "@/hooks/api/user/useUserShow";
import { useUserInteractions } from "@/hooks/api/user/useUserInteractions";

import { HeartIcon } from "@/assets/icons/HeartIcon";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";

import { brand } from "@/components/token";
import styles from "./status.module.scss";
import details from "@/assets/styles/details.module.scss";
import { Spinner } from "@/components/global/Spinner";
import { EyeIcon } from "@/assets/icons/EyeIcon";

interface Props {
    id: string;
}

export const Status = ({ id }: Props) => {
    const { id: showId } = useParams();
    const { status: initialStatus, isLoading, error } = useUserShowRating(id);
    const [status, setStatus] = useState(initialStatus);
    const { likeShow, bookmarkShow, watchedShow } = useUserInteractions();

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

    const handleWatched = async () => {
        try {
            setStatus((prevStatus) => {
                if (!prevStatus) return prevStatus;
                return {
                    ...prevStatus,
                    watched: !prevStatus.watched,
                };
            });

            await watchedShow(showId || "");
        } catch (error) {
            setStatus((prevStatus) =>
                prevStatus
                    ? {
                          ...prevStatus,
                          watched: !prevStatus.watched,
                      }
                    : prevStatus
            );
            console.error(error);
        }
    };

    if (isLoading)
        return (
            <div className={styles.loader}>
                <Spinner size="sm" />
            </div>
        );
    if (error) return null;

    return (
        <div className={details.section}>
            <div className={styles.container}>
                <button
                    className={`${styles.button} ${status?.liked ? styles.selected : ""}`}
                    onClick={handleLike}
                >
                    <HeartIcon
                        width={18}
                        height={18}
                        stroke={0}
                        fill={status?.liked ? brand.tomato : "#e7e7e7"}
                    />
                </button>
                <button className={styles.button} onClick={handleBookmark}>
                    <BookmarkIcon
                        width={18}
                        height={18}
                        stroke={0}
                        fill={status?.bookmarked ? "#000" : "#E0E0E0"}
                    />
                </button>
                <button className={styles.button} onClick={handleWatched}>
                    <EyeIcon fill={status?.watched ? "#000" : "#E0E0E0"} stroke={0} />
                </button>
            </div>
        </div>
    );
};
