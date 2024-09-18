import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";

import { Drama } from "@/types/show";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

import styles from "./dramacard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    drama: Drama;
    liked?: boolean;
}

export const DramaCard = ({ drama }: Props) => {
    const [title, setTitle] = useState<string>("");
    const language = useGeneralStore((state) => state.language);

    // kr or en
    useEffect(() => {
        setTitle(language === "kr" ? drama.original_name || drama.name : drama.name);
    }, [language, drama]);

    return (
        <div>
            <Card>
                <Link to={`/details/${drama.id}`}>
                    <Card.Image
                        src={getCroppedImageUrl(drama.poster_path.US.path, true)}
                        ratio={ratio.portrait_23}
                        rounded="0.75rem"
                    />
                    <div className={styles.details}>
                        <p>{title}</p>
                    </div>
                </Link>
            </Card>
        </div>
    );
};
