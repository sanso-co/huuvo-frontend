import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LeanShowType } from "@/types/show";
import { getCroppedImageUrl, getKrImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

import styles from "./showcard.module.scss";

interface Props {
    show: LeanShowType;
    liked?: boolean;
    tag?: string;
    label?: string;
}

export const ShowCard = ({ show, tag, label }: Props) => {
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
        <div>
            <Card>
                <Link to={`/details/${show.id}`}>
                    {label && <div className={styles.tag}>{label}</div>}
                    <Card.Image src={getImageUrl()} ratio={ratio.portrait_23} rounded="0.75rem" />
                    <div className={styles.details}>
                        <p>{title}</p>
                    </div>
                    {tag && <div className={styles.helper}>{show.emotional_appeal}</div>}
                </Link>
            </Card>
        </div>
    );
};
