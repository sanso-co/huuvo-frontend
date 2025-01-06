import { Link } from "react-router-dom";

import { getProfileImage } from "@/services/image-url";
import { useGetCast } from "@/hooks/api/credit/useCast";
import { formatUrl } from "@/helpers/formatUrl";

import { ProfileImage } from "@/components/global/ProfileImage";
import { ContentSlider } from "@/components/pattern/ContentSlider";

import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import styles from "./cast.module.scss";

interface Props {
    id: string;
}

export const Cast = ({ id }: Props) => {
    const { cast, isLoading, error } = useGetCast(Number(id));

    if (!cast?.length) {
        return null;
    }

    if (isLoading) return <div>Loading cast...</div>;
    if (error) return <div>Failed to load cast</div>;

    return (
        <>
            <div className={styles.container}>
                <div className={`${details.header} ${layout.default} ${layout.max}`}>
                    <h3>Cast</h3>
                </div>
                <div className={styles.casts}>
                    <ContentSlider>
                        {cast?.map((cast) => {
                            const name = formatUrl(cast.name ?? "");
                            return (
                                <Link
                                    to={`/cast/${name}/${cast.id}`}
                                    key={cast.id}
                                    className={styles.cast}
                                >
                                    <ProfileImage url={getProfileImage(cast.profile_path)} />
                                </Link>
                            );
                        })}
                    </ContentSlider>
                </div>
            </div>
            <div className={`${layout.default} ${layout.max}`}>
                <div className={details.border}></div>
            </div>
        </>
    );
};
