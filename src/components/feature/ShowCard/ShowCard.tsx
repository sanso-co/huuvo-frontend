import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";

import { LeanShowType } from "@/types/show";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

import styles from "./showcard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    show: LeanShowType;
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
                <Link to={`/details/${show.id}`}>
                    <Card.Image
                        src={getCroppedImageUrl(show.poster_path.US.path, true)}
                        ratio={ratio.portrait_23}
                        rounded="0.75rem"
                        // width="152px"
                    />
                    <div className={styles.details}>
                        <p>{title}</p>
                    </div>
                </Link>
            </Card>
        </div>
    );
};
