import { getCroppedImageUrl } from "@/services/image-url";
import { LeanShowType } from "@/types/show";

import styles from "./thumb.module.scss";

interface Props {
    shows: LeanShowType[];
}

export const Thumbnail = ({ shows }: Props) => {
    if (shows.length < 4) {
        const randomIndex = Math.floor(Math.random() * shows.length);
        const show = shows[randomIndex];

        return (
            <div className={styles.thumb}>
                <img src={getCroppedImageUrl(show?.poster_path.US.path)} />
            </div>
        );
    }

    // For exactly 4 shows, create a 2x2 grid
    return (
        <div className={styles.thumb}>
            <div className={styles.grid}>
                {shows.map((show, index) => (
                    <div key={show._id} className={styles.item}>
                        <img src={getCroppedImageUrl(show?.poster_path.US.path)} />
                    </div>
                ))}
            </div>
        </div>
    );
};
