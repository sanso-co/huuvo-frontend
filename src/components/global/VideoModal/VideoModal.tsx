import { useEffect } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";

import styles from "./videomodal.module.scss";

const mountElement = document.getElementById("portal");

interface Props {
    url: string;
    open: boolean;
    handleClose: () => void;
}

export const VideoModal = ({ url, open, handleClose }: Props) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }

        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, [open]);

    if (!mountElement) return null;

    return createPortal(
        <>
            {open && (
                <div className={styles.wrapper}>
                    <div className={styles.overlay} onClick={handleClose} />
                    <div className={styles.container}>
                        <div className={styles.videoplayer}>
                            <ReactPlayer
                                controls
                                className={styles.reactPlayer}
                                url={`https://www.youtube.com/watch?v=${url}`}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>,
        mountElement
    );
};
