import { Link } from "react-router-dom";

import { getProfileImage } from "@/services/image-url";
import { useGetCast } from "@/hooks/api/credit/useCast";
import { formatUrl } from "@/helpers/formatUrl";

import { ProfileImage } from "@/components/global/ProfileImage";
import { CardSlider } from "@/components/pattern/CardSlider";

import styles from "./cast.module.scss";

interface Props {
    id: number;
}

export const Cast = ({ id }: Props) => {
    const { cast, isLoading, error } = useGetCast(id);

    if (isLoading) return <div>Loading cast...</div>;
    if (error) return <div>Failed to load cast</div>;

    return (
        <div className={styles.container}>
            <h3 className="pl-1">Cast</h3>
            <CardSlider>
                {cast?.map((cast) => {
                    const name = formatUrl(cast.name ?? "");
                    return (
                        <Link to={`/person/${name}/${cast.id}`} key={cast.id}>
                            <ProfileImage url={getProfileImage(cast.profile_path)} />
                        </Link>
                    );
                })}
            </CardSlider>
        </div>
    );
};
