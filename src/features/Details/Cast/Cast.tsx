import { Link } from "react-router-dom";

import { getProfileImage } from "@/services/image-url";
import { useCast } from "@/hooks/api/credit/useCast";

import { ProfileImage } from "@/components/global/ProfileImage";
import { CardSlider } from "@/components/pattern/CardSlider";

import styles from "./cast.module.scss";

interface Props {
    id: number;
}

export const Cast = ({ id }: Props) => {
    const { cast } = useCast(id);

    return (
        <div className={styles.container}>
            <h3 className="pl-1">Cast</h3>
            <CardSlider>
                {cast?.map((cast) => (
                    <Link to={`/credit/cast/${cast.id}`} key={cast.id}>
                        <ProfileImage url={getProfileImage(cast.profile_path)} />
                    </Link>
                ))}
            </CardSlider>
        </div>
    );
};
