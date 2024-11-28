import { useState } from "react";
import { Play } from "@/assets/icons/Play";
import { MediaIcon } from "@/assets/icons/MediaIcon";
import { TrailerTypeTMDB } from "@/types/showDetail";

import styles from "./imagecontainer.module.scss";
import { VideoModal } from "@/components/global/VideoModal";

interface Props {
    src: string;
    video?: TrailerTypeTMDB[];
}

export const ImageContainer = ({ src, video }: Props) => {
    const noImage = src === "no-image";
    const [overlayOpen, setOverlayOpen] = useState(false);

    const handleModal = () => {
        setOverlayOpen(!overlayOpen);
    };

    return (
        <div className={styles.container}>
            {noImage ? (
                <div className={styles.placeholder}>
                    <MediaIcon />
                </div>
            ) : (
                <img src={src} alt="" />
            )}
            {video && (
                <div className={styles.playIcon} onClick={handleModal}>
                    <Play fill="#eee" />
                </div>
            )}
            <VideoModal url={video?.[0]?.key || ""} open={overlayOpen} handleClose={handleModal} />
        </div>
    );
};
