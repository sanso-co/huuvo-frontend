import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";

import { Show } from "@/types/show";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

import styles from "./showcard.module.scss";

interface Props {
    show: Show;
    liked?: boolean;
}

export const ShowCard = ({ show }: Props) => {
    const [title, setTitle] = useState<string>(show.name);
    const language = useGeneralStore((state) => state.language);

    // kr or en
    useEffect(() => {
        setTitle(language === "kr" ? show.original_name || show.name : show.name);
    }, [language, show]);

    return (
        <div>
            <Card>
                <Card.Image src={getCroppedImageUrl(show.poster_path, true)} ratio={ratio.portrait_23} rounded="0.75rem" />
                <div className={styles.details}>
                    <p>{title}</p>
                </div>
            </Card>
        </div>
    );
};
