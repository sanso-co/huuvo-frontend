import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";

import { LeanShowType } from "@/types/show";
import { getCroppedImageUrl, getKrImageUrl } from "@/services/image-url";

import styles from "./searchcard.module.scss";
import { formatYear } from "@/helpers/date";

interface Props {
    show: LeanShowType;
    liked?: boolean;
    handleClick: () => void;
}

export const SearchCard = ({ show, handleClick }: Props) => {
    const [title, setTitle] = useState<string>(show.name);
    const language = useGeneralStore((state) => state.language);

    // kr or en
    useEffect(() => {
        setTitle(language === "kr" ? show.original_name || show.name : show.name);
    }, [language, show]);

    const getImageUrl = () => {
        if (show?.poster_path?.US?.path ?? "" !== "") {
            return getCroppedImageUrl(show?.poster_path.US.path);
        } else if (show?.poster_path?.KR?.path ?? "" !== "") {
            return getKrImageUrl(show?.poster_path?.KR?.path);
        } else {
            return "";
        }
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.image}>
                <img src={getImageUrl()} />
            </div>
            <div className={styles.details}>
                <p className={styles.title}>{title}</p>
                <p className={styles.date}>{formatYear(show.first_air_date)}</p>
            </div>
        </div>
    );
};
