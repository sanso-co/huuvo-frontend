import { useState } from "react";
import { Link } from "react-router-dom";

import { getProfileImage } from "@/services/image-url";
import { useGetCast } from "@/hooks/api/credit/useCast";
import { formatUrl } from "@/helpers/formatUrl";

import { ProfileImage } from "@/components/global/ProfileImage";
import { ContentSlider } from "@/components/pattern/ContentSlider";

import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import styles from "./cast.module.scss";
import { Modal } from "@/components/global/Modal";

interface Props {
    id: string;
}

export const Cast = ({ id }: Props) => {
    const { cast, isLoading, error } = useGetCast(Number(id));
    const [modalOpen, setModalOpen] = useState(false);

    if (!cast?.length) {
        return null;
    }

    if (isLoading) return <div>Loading cast...</div>;
    if (error) return <div>Failed to load cast</div>;

    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.header} ${layout.default} ${layout.max}`}>
                    <h3>Cast</h3>
                    <button onClick={() => setModalOpen(true)}>Details</button>
                    <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
                        <div className={styles.details}>
                            {cast?.map((cast) => {
                                const name = formatUrl(cast.name ?? "");
                                return (
                                    <Link
                                        to={`/cast/${name}/${cast.id}`}
                                        key={cast.id}
                                        className={styles.detailCast}
                                    >
                                        <ProfileImage url={getProfileImage(cast.profile_path)} />
                                        <div>
                                            <div className={styles.role}>{cast.role}</div>
                                            <div className={styles.name}>{cast.name}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </Modal>
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
